import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default function Home({ mudarNomeJogadores, changeScreen }) {
  const [jogador1, setJogador1] = useState("");
  const [jogador2, setJogador2] = useState("");

  const iniciarJogo = () => {
    mudarNomeJogadores(jogador1, jogador2);
    changeScreen("jogo_velha"); // Mude para a tela do jogo da Velha
  };

  return (
    <View style={styles.container}>
      <Text>Tela Inicial</Text>
      <TextInput
        placeholder="Nome do Jogador 1"
        onChangeText={(text) => setJogador1(text)}
        value={jogador1}
        style={styles.input}
      />
      <TextInput
        placeholder="Nome do Jogador 2"
        onChangeText={(text) => setJogador2(text)}
        value={jogador2}
        style={styles.input}
      />
      <Button title="Jogo da Velha" onPress={iniciarJogo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "80%",
    marginBottom: 20,
  },
});
