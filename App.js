import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button } from "react-native";
import Home from "./src/Home";
import JogoVelha from "./src/JogoVelha";
import JogoForca from "./src/JogoForca";
import JogoMemoria from "./src/JogoMemoria";

export default function App() {
  //controlar a tela atual.
  const [screen, setScreen] = useState("home");
  //armazena os nomes dos jogadores.
  const [jogador1, setJogador1] = useState("");
  const [jogador2, setJogador2] = useState("");

  //atualiza os nomes dos jogadores.
  const mudarNomeJogadores = (nome1, nome2) => {
    setJogador1(nome1);
    setJogador2(nome2);
  };

  // Função para mudar a tela
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
          jogador1={jogador1}
          jogador2={jogador2}
        />
      )}
      {screen === "jogo_forca" && <JogoForca changeScreen={changeScreen} />}
      {screen === "home" && (
        <Button
          title="Jogo da Forca"
          onPress={() => changeScreen("jogo_forca")}
        />
      )}
      {screen === "Jogo_memoria" && (
        <JogoMemoria changeScreen={changeScreen} />
      )}
      {screen === "home" && (
        <Button
          title="Jogo da Memória"
          onPress={() => changeScreen("Jogo_memoria")}
        />
      )}
    </View>
  );
}
//css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 300,
    backgroundColor: "#E0FFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});
