import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import Home from "./src/Home";
import JogoVelha from "./src/JogoVelha";
import JogoForca from "./src/JogoForca";
import JogoMemoria from "./src/JogoMemoria";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [jogador1, setJogador1] = useState("");
  const [jogador2, setJogador2] = useState("");

  const mudarNomeJogadores = (nome1, nome2) => {
    setJogador1(nome1);
    setJogador2(nome2);
  };

  const changeScreen = (newScreen) => setScreen(newScreen);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {screen === "home" && (
        <Home
          mudarNomeJogadores={mudarNomeJogadores}
          changeScreen={changeScreen}
        />
      )}
      {screen === "jogo_velha" && (
        <JogoVelha
          changeScreen={changeScreen}
          player1={jogador1}
          player2={jogador2}
        />
      )}
      {screen === "jogo_forca" && <JogoForca changeScreen={changeScreen} />}
      {screen === "home" && (
        <Button
          title="Jogo da Forca"
          onPress={() => changeScreen("jogo_forca")}
        />
      )}
      

      {screen === "Jogo_memoria" && <JogoMemoria changeScreen={changeScreen} />}
      {screen === "home" && (
        <Button
          title="Jogo da Memoria"
          onPress={() => changeScreen("Jogo_memoria")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 190,

    backgroundColor: "#12f",
    display: "flex",
    alignItems: "center",
    flexDirection: "column-reverse",
    justifyContent: "center",
  },
});
