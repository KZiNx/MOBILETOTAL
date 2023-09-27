import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './src/Home'
import Jogo from './src/Jogo'


export default function App() {

const [scream, setScream] = useState("jogo");
const [player1, setPlayer1] = useState("");
const [player2, setPlayer2] = useState("");

const checkScream = (checkScream) => checkScream === scream;

const setJogadores = (nome1, nome2) =>{
  setPlayer1(nome1);
  setPlayer2(nome2);  
}

const changeScream = (newScream) => setScream(newScream);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {checkScream('home') && <Home mudarNomeJogadores={setJogadores} changeScream={changeScream} />}
      {checkScream('jogo') && <Jogo changeScream={changeScream} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#44f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});