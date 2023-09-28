import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const cards = [
  { id: 1, value: "🥶" },
  { id: 2, value: "😝" },
  { id: 3, value: "😍" },
  { id: 4, value: "😃" },
  { id: 5, value: "🥶" },
  { id: 6, value: "😝" },
  { id: 7, value: "😍" },
  { id: 8, value: "😃" },
  { id: 9, value: "🥵" },
  { id: 10, value: "😑" },
  { id: 11, value: "😑" },
  { id: 12, value: "😡" },
  { id: 13, value: "😡" },
  { id: 14, value: "🤢" },
  { id: 15, value: "🤢" },
  { id: 16, value: "🤡" },
  { id: 17, value: "🤡" },
  { id: 18, value: "👻" },
  { id: 19, value: "👻" },
  { id: 20, value: "☠️" },
  { id: 21, value: "☠️" },
  { id: 22, value: "👽" },
  { id: 23, value: "👽" },
  { id: 24, value: "🥵" },
  { id: 25, value: "🤯" },
  { id: 26, value: "🤯" },
  { id: 27, value: "🙄" },
  { id: 28, value: "🙄" },
  { id: 29, value: "😎" },
  { id: 30, value: "😎" },
  { id: 31, value: "🤓" },
  { id: 32, value: "🤓" },
  { id: 33, value: "🤟" },
  { id: 34, value: "🤟" },
  { id: 35, value: "👍" },
  { id: 36, value: "👍" },
  { id: 37, value: "🙃" },
  { id: 38, value: "🙃" },
  { id: 39, value: "🤩" },
  { id: 40, value: "🤩" },
  { id: 41, value: "🤪" },
  { id: 42, value: "🤪" },
  { id: 43, value: "🤬" },
  { id: 44, value: "🤬" },
  { id: 45, value: "🤮" },
  { id: 46, value: "🤮" },
  { id: 47, value: "🤥" },
  { id: 48, value: "🤥" },
  { id: 49, value: "🤫" },
  { id: 50, value: "🤫" },
];

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const JogoMemoria = ({ changeScreen }) => {
  const [board, setBoard] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const shuffledCards = shuffleArray(cards);
    setBoard(shuffledCards);
    setFlippedIndexes([]);
    setMatches([]);
  };

  const handleCardPress = (index) => {
    if (flippedIndexes.length === 2 || flippedIndexes.includes(index)) {
      return;
    }

    const newFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);

    if (newFlippedIndexes.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndexes;
      if (board[firstIndex].value === board[secondIndex].value) {
        setTimeout(() => {
          setMatches([...matches, board[firstIndex].id, board[secondIndex].id]);
          setFlippedIndexes([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  const renderCard = (card, index) => {
    const isFlipped =
      flippedIndexes.includes(index) || matches.includes(card.id);
    const cardStyle = isFlipped ? styles.cardFlipped : styles.card;

    return (
      <TouchableOpacity
        key={index}
        style={cardStyle}
        onPress={() => handleCardPress(index)}
        disabled={isFlipped || flippedIndexes.length === 2}
      >
        {isFlipped && <Text style={styles.cardText}>{card.value}</Text>}
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    return (
      <View style={styles.board}>
        {board.map((card, index) => renderCard(card, index))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Memória</Text>
      {renderBoard()}
      <TouchableOpacity style={styles.button} onPress={initializeBoard}>
        <Text style={styles.buttonText}>Reiniciar Jogo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changeScreen("home")}
      >
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11f",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 80,
    height: 80,
    backgroundColor: "lightgray",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardFlipped: {
    width: 80,
    height: 80,
    backgroundColor: "lightblue",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontSize: 24,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});

export default JogoMemoria;
