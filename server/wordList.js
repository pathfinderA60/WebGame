const words = [
  // Animals
  'elephant', 'penguin', 'giraffe', 'butterfly', 'dolphin', 'lion', 'tiger', 'zebra', 'rabbit', 'owl',
  'panda', 'whale', 'shark', 'eagle', 'snake', 'dinosaur', 'crocodile', 'octopus', 'flamingo', 'kangaroo',
  
  // Objects
  'bicycle', 'guitar', 'camera', 'telescope', 'lightbulb', 'candle', 'clock', 'phone', 'computer', 'keyboard',
  'monitor', 'printer', 'chair', 'table', 'lamp', 'mirror', 'window', 'door', 'book', 'pencil',
  
  // Nature
  'mountain', 'river', 'ocean', 'forest', 'volcano', 'sunset', 'rainbow', 'snowflake', 'thunder', 'tornado',
  'cloud', 'storm', 'waterfall', 'lake', 'desert', 'beach', 'island', 'cave', 'valley', 'cliff',
  
  // Food
  'pizza', 'hamburger', 'ice cream', 'donut', 'cake', 'apple', 'banana', 'strawberry', 'grape', 'watermelon',
  'broccoli', 'carrot', 'corn', 'potato', 'cheese', 'egg', 'bread', 'spaghetti', 'taco', 'cookie',
  
  // Sports
  'basketball', 'football', 'tennis', 'soccer', 'baseball', 'hockey', 'skiing', 'skateboard', 'surfing', 'boxing',
  'swimming', 'cycling', 'golf', 'bowling', 'volleyball', 'badminton', 'archery', 'fencing', 'gymnastics', 'wrestling',
  
  // Weather
  'rain', 'snow', 'hail', 'sleet', 'fog', 'wind', 'lightning', 'frost', 'humidity', 'pressure',
  
  // Activities
  'dancing', 'singing', 'painting', 'reading', 'cooking', 'sleeping', 'running', 'jumping', 'walking', 'climbing',
  
  // Professions
  'doctor', 'teacher', 'astronaut', 'pirate', 'cowboy', 'chef', 'artist', 'dancer', 'police', 'firefighter',
  
  // Vehicles
  'car', 'truck', 'train', 'airplane', 'helicopter', 'boat', 'rocket', 'submarine', 'bus', 'motorcycle',
  
  // Buildings
  'house', 'castle', 'pyramid', 'bridge', 'tower', 'church', 'hospital', 'school', 'library', 'museum',
  
  // Emotions
  'happy', 'sad', 'angry', 'scared', 'excited', 'confused', 'surprised', 'tired', 'hungry', 'calm',
  
  // Colors
  'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'pink', 'brown', 'black', 'white',
  
  // Technology
  'robot', 'satellite', 'website', 'password', 'virus', 'download', 'upload', 'internet', 'wifi', 'server',
  
  // Fantasy
  'dragon', 'unicorn', 'wizard', 'ghost', 'vampire', 'werewolf', 'mummy', 'zombie', 'witch', 'troll',
  
  // Clothing
  'shirt', 'pants', 'hat', 'shoes', 'dress', 'coat', 'jacket', 'tie', 'scarf', 'gloves',
];

function getRandomWords(count = 3) {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export { words, getRandomWords };
