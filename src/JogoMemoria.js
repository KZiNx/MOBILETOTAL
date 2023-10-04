import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const cartas = [
  { id: 1, valor: "🥶" },
  { id: 2, valor: "🥶" },
  { id: 3, valor: "😃" },
  { id: 4, valor: "😃" },
  { id: 5, valor: "😝" },
  { id: 6, valor: "😝" },
  { id: 7, valor: "😍" },
  { id: 8, valor: "😍" },
  { id: 9, valor: "🥵" },
  { id: 10, valor: "🥵" },
  { id: 11, valor: "😑" },
  { id: 12, valor: "😑" },
  { id: 13, valor: "😡" },
  { id: 14, valor: "😡" },
  { id: 15, valor: "🤢" },
  { id: 16, valor: "🤢" },
  { id: 17, valor: "🤡" },
  { id: 18, valor: "🤡" },
  { id: 19, valor: "👻" },
  { id: 20, valor: "👻" },
  { id: 21, valor: "☠️" },
  { id: 22, valor: "☠️" },
  { id: 23, valor: "👽" },
  { id: 24, valor: "👽" },
  { id: 25, valor: "🤯" },
  { id: 26, valor: "🤯" },
  { id: 27, valor: "🙄" },
  { id: 28, valor: "🙄" },
  { id: 29, valor: "😎" },
  { id: 30, valor: "😎" },
  { id: 31, valor: "🤓" },
  { id: 32, valor: "🤓" },
  { id: 33, valor: "🤟" },
  { id: 34, valor: "🤟" },
  { id: 35, valor: "👍" },
  { id: 36, valor: "👍" },
  { id: 37, valor: "🙃" },
  { id: 38, valor: "🙃" },
  { id: 39, valor: "🤩" },
  { id: 40, valor: "🤩" },
  { id: 41, valor: "🤪" },
  { id: 42, valor: "🤪" },
  { id: 43, valor: "🤬" },
  { id: 44, valor: "🤬" },
  { id: 45, valor: "🤮" },
  { id: 46, valor: "🤮" },
  { id: 47, valor: "🤥" },
  { id: 48, valor: "🤥" },
  { id: 49, valor: "🤫" },
  { id: 50, valor: "🤫" }
];

const embaralharArray = (array) => {
  const arrayEmbaralhado = [...array];
  for (let i = arrayEmbaralhado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayEmbaralhado[i], arrayEmbaralhado[j]] = [arrayEmbaralhado[j], arrayEmbaralhado[i]];
  }
  return arrayEmbaralhado;
};

const JogoMemoria = ({ mudarTela }) => {
  const [tabuleiro, setTabuleiro] = useState([]);
  const [indicesVirados, setIndicesVirados] = useState([]);
  const [paresEncontrados, setParesEncontrados] = useState([]);

  useEffect(() => {
    iniciarTabuleiro();
  }, []);

  const iniciarTabuleiro = () => {
    const cartasEmbaralhadas = embaralharArray(cartas);
    setTabuleiro(cartasEmbaralhadas);
    setIndicesVirados([]);
    setParesEncontrados([]);
  };

  const lidarComPressaoCarta = (indice) => {
    if (indicesVirados.length === 2 || indicesVirados.includes(indice)) {
      return;
    }

    const novosIndicesVirados = [...indicesVirados, indice];
    setIndicesVirados(novosIndicesVirados);

    if (novosIndicesVirados.length === 2) {
      const [primeiroIndice, segundoIndice] = novosIndicesVirados;
      if (tabuleiro[primeiroIndice].valor === tabuleiro[segundoIndice].valor) {
        setTimeout(() => {
          setParesEncontrados([...paresEncontrados, tabuleiro[primeiroIndice].id, tabuleiro[segundoIndice].id]);
          setIndicesVirados([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setIndicesVirados([]);
        }, 1000);
      }
    }
  };

  const renderizarCarta = (carta, indice) => {
    const estaVirada =
      indicesVirados.includes(indice) || paresEncontrados.includes(carta.id);
    const estiloCarta = estaVirada ? styles.cartaVirada : styles.carta;

    return (
      <TouchableOpacity
        key={indice}
        style={estiloCarta}
        onPress={() => lidarComPressaoCarta(indice)}
        disabled={estaVirada || indicesVirados.length === 2}
      >
        {estaVirada && <Text style={styles.textoCarta}>{carta.valor}</Text>}
      </TouchableOpacity>
    );
  };

  const renderizarTabuleiro = () => {
    return (
      <View style={styles.tabuleiro}>
        {tabuleiro.map((carta, indice) => renderizarCarta(carta, indice))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Memória</Text>
      {renderizarTabuleiro()}
      <TouchableOpacity style={styles.botao} onPress={iniciarTabuleiro}>
        <Text style={styles.textoBotao}>Reiniciar Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => mudarTela("home")}
      >
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00CED1",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 20,
  },
  tabuleiro: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  carta: {
    width: 80,
    height: 80,
    backgroundColor: "black",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cartaVirada: {
    width: 80,
    height: 80,
    backgroundColor: "#7FFF00",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textoCarta: {
    fontSize: 30,
  },
  botao: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  textoBotao: {
    fontSize: 18,
    color: "white",
  },
  titulo: {
    fontSize: 24,
  },
});

export default JogoMemoria;
