import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function Home(props) {

const [player1, setPlayer1] = useState("");
const [player2, setPlayer2] = useState("");

const handClick = ()=>{
    if(player1 === "" || player2 ===""){
        alert("Erro, digite um nome válido");
    }else{
      alert(player1 +" x "+ player2);
      props.mudarNomeJogadores(player1, player2);
      props.changeScream('jogo')
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo ao Jogo da Velha digite o nome dos jogadores 1 e 2</Text>
      <Text style={styles.text}>Nome: {player1}</Text>
      <TextInput style={styles.input} placeholderTextColor = "white" placeholder="Player 1" onChangeText={setPlayer1} />
      <Text style={styles.text}>Nome: {player2}</Text>
      <TextInput style={styles.input} placeholderTextColor = "white" placeholder="Player 2" onChangeText={setPlayer2} />
      <Button title='Me aperte' onPress={handClick}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flex: 1,
    gap: 20,
    backgroundColor: '#44f',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: 'white',
    fontSize: 20,
  },

  input: {
    width: "80%",
    height: 40,
    color: "#fff",
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'white',
    padding: 10
  },

  title: {
    color: "white",
    fontSize: 31,
    textAlign: "center",
    width: "85%",
    margin: "auto",
  },

});