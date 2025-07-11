import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [nums, setNums] = useState([0, 0, 0, 0]);
  const [mensagem, setMensagem] = useState('');

  const handleChange = (value, index) => {
    const novos = [...nums];
    novos[index] = parseInt(value);
    setNums(novos);
  };

  const verificarSenha = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/verificar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1: nums[0], num2: nums[1], num3: nums[2], num4: nums[3] }),
      });
      const data = await response.json();
      setMensagem(data.mensagem);
    } catch (error) {
      setMensagem('Erro ao conectar com o servidor.');
    }
  };

  const renderPicker = (index) => (
    <Picker
      selectedValue={nums[index]}
      style={styles.picker}
      onValueChange={(value) => handleChange(value, index)}
      key={index}
    >
      {[...Array(10).keys()].map((num) => (
        <Picker.Item label={num.toString()} value={num} key={num} />
      ))}
    </Picker>
  );

  return (
    <ImageBackground source={require('./assets/cofre.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>🔐 Cofre Secreto</Text>
        <View style={styles.row}>{[0, 1, 2, 3].map(renderPicker)}</View>
        <Button title="Abrir" onPress={verificarSenha} />
        <Text style={styles.message}>{mensagem}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  picker: {
    height: 100,
    width: 60,
  },
  message: {
    marginTop: 20,
    fontSize: 18,
  },
});
