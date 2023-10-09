import * as React from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    getVoices();
  }, []);

  // Puhe
  const speak = () => {
    Speech.speak(text, {
      voice: selectedVoice,
    });
  };

  // Eri puhujat
  const getVoices = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    setVoices(availableVoices);
    console.log(availableVoices);
    setSelectedVoice(availableVoices[0]?.identifier || null);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textbox}
        placeholder='Write here'
        value={text}
        onChangeText={text => setText(text)}
      />
      <Picker
        selectedValue={selectedVoice}
        onValueChange={(value) => setSelectedVoice(value)}>
        {voices.map((voice, index) => (
          <Picker.Item
            key={index}
            label={voice.name}
            value={voice.identifier}
          />
        ))}
      </Picker>
      <View style={styles.button}>
        <Button
          color='white'
          title='PRESS TO HEAR TEXT'
          onPress={speak}
          disabled={!text || !selectedVoice}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  textbox: {
    justifyContent: 'center',
    borderWidth: 2,
    marginLeft: 60,
    marginRight: 60,
    height: 60,
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 10,
    marginRight: 90,
    marginLeft: 90,
  },
});
