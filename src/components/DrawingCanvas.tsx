import { useRef, useEffect, useState, useCallback } from 'react';

export interface DrawingEvent {
  type: 'draw' | 'clear' | 'move' | 'color' | 'size' | 'undo';
  x?: number;
  y?: number;
  color?: string;
  size?: number;
}

interface DrawingCanvasProps {
  isDrawer: boolean;
  onDraw: (data: DrawingEvent) => void;
  drawingEvents: DrawingEvent[];
  isPlaying: boolean;
}

interface HistoryState {
  imageData: ImageData;
  events: DrawingEvent[];
}

export default function DrawingCanvas({
  isDrawer,
  onDraw,
  drawingEvents,
  isPlaying,
}: DrawingCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [size, setSize] = useState(3);
  const [undoHistory, setUndoHistory] = useState<HistoryState[]>([]);
  const [dpi, setDpi] = useState(1);

  // Setup canvas with proper DPI handling and responsiveness
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpi = window.devicePixelRatio || 1;
    setDpi(dpi);

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(rect.width, 100);
      const height = Math.max(rect.height, 100);

      canvas.width = width * dpi;
      canvas.height = height * dpi;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpi, dpi);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        // Redraw after resize
        redrawCanvas();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width / dpi, canvas.height / dpi);

    let currentColor = '#ffffff';
    let currentSize = 3;

    drawingEvents.forEach((event) => {
      if (event.type === 'clear') {
        ctx.clearRect(0, 0, canvas.width / dpi, canvas.height / dpi);
      } else if (event.type === 'color') {
        currentColor = event.color || '#ffffff';
      } else if (event.type === 'size') {
        currentSize = event.size || 3;
      } else if (event.type === 'move') {
        ctx.beginPath();
        ctx.moveTo(event.x || 0, event.y || 0);
      } else if (event.type === 'draw') {
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = currentSize;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineTo(event.x || 0, event.y || 0);
        ctx.stroke();
      }
    });
  }, [drawingEvents, dpi]);

  // Redraw canvas when receiving events
  useEffect(() => {
    redrawCanvas();
  }, [drawingEvents, redrawCanvas]);

  const getCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) / dpi;
    const y = (clientY - rect.top) / dpi;
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawer || !isPlaying) return;
    const { x, y } = getCoordinates(e.clientX, e.clientY);
    setIsDrawing(true);

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      onDraw({ type: 'move', x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawer || !isPlaying || !isDrawing) return;
    const { x, y } = getCoordinates(e.clientX, e.clientY);

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      onDraw({ type: 'draw', x, y, color, size });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawer || !isPlaying) return;
    e.preventDefault();
    const touch = e.touches[0];
    const { x, y } = getCoordinates(touch.clientX, touch.clientY);
    setIsDrawing(true);

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      onDraw({ type: 'move', x, y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawer || !isPlaying || !isDrawing) return;
    e.preventDefault();
    const touch = e.touches[0];
    const { x, y } = getCoordinates(touch.clientX, touch.clientY);

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineTo(x, y);
      ctx.stroke();
      onDraw({ type: 'draw', x, y, color, size });
    }
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const handleBrushSizeChange = (newSize: number) => {
    setSize(newSize);
    onDraw({ type: 'size', size: newSize });
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onDraw({ type: 'color', color: newColor });
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width / dpi, canvas.height / dpi);
        onDraw({ type: 'clear' });
      }
    }
  };

  const handleUndo = () => {
    if (undoHistory.length > 0) {
      setUndoHistory(undoHistory.slice(0, -1));
      // Emit undo event
      onDraw({ type: 'undo' });
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-900 gap-2 sm:gap-3">
      {/* Controls - Responsive Layout */}
      {isDrawer && isPlaying && (
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center bg-gray-800 border border-gray-700 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
          {/* Color Picker */}
          <div className="flex items-center gap-1 sm:gap-2">
            <label className="text-gray-400 font-semibold hidden sm:inline">Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded cursor-pointer border border-gray-600 hover:border-gray-500"
              title="Select color"
            />
          </div>

          {/* Predefined Colors */}
          <div className="flex gap-1 border-l border-gray-700 pl-2">
            {['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00'].map((c) => (
              <button
                key={c}
                onClick={() => handleColorChange(c)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded border-2 ${color === c ? 'border-white' : 'border-gray-600'}`}
                style={{ backgroundColor: c }}
                title={`Color ${c}`}
              />
            ))}
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-1 sm:gap-2 border-l border-gray-700 pl-2">
            <label className="text-gray-400 font-semibold hidden sm:inline">Size:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={size}
              onChange={(e) => handleBrushSizeChange(parseInt(e.target.value))}
              className="w-16 sm:w-24 h-1 cursor-pointer"
            />
            <span className="text-gray-400 w-8 text-center">{size}px</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1 sm:gap-2 ml-auto border-l border-gray-700 pl-2">
            {undoHistory.length > 0 && (
              <button
                onClick={handleUndo}
                className="px-2 sm:px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors"
                title="Undo"
              >
                ↶
              </button>
            )}
            <button
              onClick={handleClearCanvas}
              className="px-2 sm:px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-semibold transition-colors"
              title="Clear canvas"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Canvas Container - Responsive and Fit to Screen */}
      <div
        ref={containerRef}
        className="flex-1 bg-white rounded-lg border-2 border-gray-700 overflow-hidden shadow-lg"
        style={{ minHeight: 0 }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`w-full h-full block ${isDrawer && isPlaying ? 'cursor-crosshair' : 'cursor-default'}`}
          style={{ background: '#ffffff', touchAction: 'none', display: 'block' }}
        />
      </div>

      {!isDrawer && !isPlaying && (
        <div className="text-center text-gray-400 text-xs sm:text-sm py-2">
          Waiting to start...
        </div>
      )}
    </div>
  );
}
