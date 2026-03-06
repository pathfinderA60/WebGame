import { View, Text } from 'react-native'

export default function Greeting({ name }) {
  return (
    <View
      style={{
        padding: 16,
        backgroundColor: '#f0f9ff',
        borderRadius: 8,
        marginTop: 16,
      }}
    >
      <Text style={{ fontSize: 18, color: '#0369a1' }}>
        👋 Hello, {name}! This is a React Native Web component (JS).
      </Text>
    </View>
  )
}
