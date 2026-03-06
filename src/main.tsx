import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRegistry } from 'react-native'
import './index.css'
import App from './App.tsx'

// Register with React Native Web's AppRegistry
AppRegistry.registerComponent('WebGame', () => App)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
