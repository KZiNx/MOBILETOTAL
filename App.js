import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() { //exportando uma função padrão
  const [player1, setPlayer1 ] = useState("");

  const handleInputPlayer1 = (event) =>{
    alert(event)
  }
  const [player2, setPlayer2 ] = useState("");

  const handleInputPlayer2 = (event) =>{
    alert(event)
  }

  const handleClick = (event) =>{
    alert("click")
  }

  return (//metódo para retornar código JSX
    <View style={styles.container}>
      <Text>Nome player 1: {player1}</Text>
      <StatusBar style="auto" />
      <TextInput  placeholder='player 1' style={styles.input} onChangeText ={setPlayer1} />

      <Text>Nome player 2: {player2}</Text>
      <StatusBar style="auto" />
      <TextInput  placeholder='player 2' style={styles.input} onChangeText ={setPlayer2} />
      <Button title="botão" onPress={handleClick}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { //criando uma classe e estilizando
    flex: 1,
    backgroundColor: 'wheat',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: "80%",
    height: 20,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1
  },
});