import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const valoresIniciais = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export default function JogoDaVelha({ changeScreen, jogador1, jogador2 }) {
  const [states, setstates] = useState(valoresIniciais);
  const [jogador, setJogador] = useState("X");

  const Voltar = () => {
    changeScreen("home");
  };


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

  const encerrarJogo = (mensagem) => {
    alert(mensagem);
    setstates(valoresIniciais);
    Voltar();
  };

  const verificarEmpate = () => {
    let countstates = 0;

    states.forEach((linha) => {
      linha.forEach((coluna) => {
        if (coluna === "X" || coluna === "O") countstates++;
      });
    });

    return countstates === 9;
  };

  const verificarVitoria = () => {
    if (verificarVitoriaDoJogador("X")) {
      encerrarJogo(`O jogador ${jogador1} venceu!`);
    } else if (verificarVitoriaDoJogador("O")) {
      encerrarJogo(`O jogador ${jogador2} venceu!`);
    } else if (verificarEmpate()) {
      encerrarJogo("Ninguém venceu!");
    }
  };

  const Click = (linha, coluna) => {
    if (states[linha][coluna] !== "") {
      return;
    }

    const novoEstado = [...states];
    novoEstado[linha][coluna] = jogador;
    setstates([...novoEstado]);
    setJogador(jogador === "X" ? "O" : "X");
    verificarVitoria();
  };

  const getNomeJogador = () => (jogador === "X" ? jogador1 : jogador2);

  return (
    <View style={styles.container}>
      <Text>
        É a vez do jogador: {getNomeJogador()} - {jogador}
      </Text>

      {states.map((linha, indexLinha) => {
        return (
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
        );
      })}
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
