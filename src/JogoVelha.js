import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

// Matriz para representar os valores iniciais do jogo da velha.
const valoresIniciais = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export default function JogoDaVelha({ changeScreen, jogador1, jogador2 }) {
  const [states, setStates] = useState(valoresIniciais);
  const [jogador, setJogador] = useState("X");

  // Função para voltar à tela inicial.
  const Voltar = () => {
    changeScreen("home");
  };

  // Função para verificar se um jogador venceu com base na matriz de jogo.
  const verificarVitoriaDoJogador = (jogador) => {
    // Verificar linhas
    for (let i = 0; i < 3; i++) {
      if (
        states[i][0] === jogador &&
        states[i][1] === jogador &&
        states[i][2] === jogador
      ) {
        return true;
      }
    }
    // Verificar colunas
    for (let i = 0; i < 3; i++) {
      if (
        states[0][i] === jogador &&
        states[1][i] === jogador &&
        states[2][i] === jogador
      ) {
        return true;
      }
    }

    // Verificar diagonais
    if (
      states[0][0] === jogador &&
      states[1][1] === jogador &&
      states[2][2] === jogador
    ) {
      return true;
    }
    if (
      states[0][2] === jogador &&
      states[1][1] === jogador &&
      states[2][0] === jogador
    ) {
      return true;
    }

    return false;
  };

  // Função para encerrar o jogo com uma mensagem.
  const encerrarJogo = (mensagem) => {
    alert(mensagem);
    setStates(valoresIniciais);
    Voltar();
  };

  // Função para verificar se o jogo empatou (todos os espaços preenchidos).
  const verificarEmpate = () => {
    let countStates = 0;

    states.forEach((linha) => {
      linha.forEach((coluna) => {
        if (coluna === "X" || coluna === "O") countStates++;
      });
    });

    return countStates === 9;
  };

  // Função para verificar o resultado do jogo (vitória, empate ou continuação).
  const verificarVitoria = () => {
    if (verificarVitoriaDoJogador("X")) {
      encerrarJogo(`O jogador ${jogador1} venceu!`);
    } else if (verificarVitoriaDoJogador("O")) {
      encerrarJogo(`O jogador ${jogador2} venceu!`);
    } else if (verificarEmpate()) {
      encerrarJogo("Ninguém venceu!");
    }
  };

  // Função chamada quando um botão é clicado.
  const Click = (linha, coluna) => {
    if (states[linha][coluna] !== "") {
      return; // A célula já está preenchida.
    }

    const novoEstado = [...states];
    novoEstado[linha][coluna] = jogador;
    setStates(novoEstado);
    setJogador(jogador === "X" ? "O" : "X"); // Alternar jogadores
    verificarVitoria();
  };

  // Função para obter o nome do jogador atual.
  const getNomeJogador = () => (jogador === "X" ? jogador1 : jogador2);

  return (
    <View style={styles.container}>
      <Text>
        Vez do: {getNomeJogador()} - Jogando com o:  {jogador}
      </Text>

      {states.map((linha, indexLinha) => (
        <View style={styles.linha} key={indexLinha}>
          {linha.map((coluna, indexColuna) => (
            <TouchableOpacity
              key={indexColuna}
              onPress={() => Click(indexLinha, indexColuna)}
            >
              <View style={styles.botaoJogo}>
                <Text style={styles.textoBotaoJogo}>{coluna}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <Button title="Voltar" onPress={Voltar} />
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: "row",
  },
  botaoJogo: {
    backgroundColor: "#191970",
    width: 90,
    height: 90,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotaoJogo: {
    fontSize: 50,
    color: "#B0E0E6",
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 200,
    marginBottom: 200,
    backgroundColor: "#00CED1",
    alignItems: "center",
    justifyContent: "center",
  },
});
