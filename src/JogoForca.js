import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const palavras = ["casa", "carro", "computador", "celular", "caneta", "livro","macaco"];

const Forca = ({ changeScreen }) => {
  const [SelecionarPalavra, setSelecionarPalavra] = useState("");
  const [Chute, setChute] = useState("");
  const [Tentativas, setTentativas] = useState(6);
  const [ColocarLetra, setColocarLetra] = useState("");
  const [ColocarPalavra, setColocarPalavra] = useState("");
  const [LetrasUsadas, setLetrasUsadas] = useState([]);

  useEffect(() => {
    // Select a random word from the palavras
    const randomIndex = Math.floor(Math.random() * palavras.length);
    setSelecionarPalavra(palavras[randomIndex].toUpperCase());
  }, []);

  const handleletraInput = (text) => {
    setColocarLetra(text.toUpperCase());
  };

  const handleWordInput = (text) => {
    setColocarPalavra(text.toUpperCase());
  };

  const handleGuessletra = () => {
    if (ColocarLetra && SelecionarPalavra) {
      const letra = ColocarLetra[0];

      if (LetrasUsadas.includes(letra)) {
        // letra already used, do nothing
        return;
      }

      const wordArray = SelecionarPalavra.split("");
      let newChute = "";

      for (const char of wordArray) {
        if (char === letra) {
          newChute += char;
        } else if (Chute.includes(char)) {
          newChute += char;
        } else {
          newChute += "_";
        }
      }

      setChute(newChute);
      setLetrasUsadas([...LetrasUsadas, letra]);

      if (!SelecionarPalavra.includes(letra)) {
        setTentativas(Tentativas - 1);
      }

      if (newChute === SelecionarPalavra) {
        alert("Você venceu! A palavra é: " + SelecionarPalavra);
        changeScreen("home");
      } else if (Tentativas === 0) {
        alert("Você perdeu! A palavra era: " + SelecionarPalavra);
        changeScreen("home");
      }
    }

    setColocarLetra("");
  };

  const handleGuessWord = () => {
    if (ColocarPalavra && SelecionarPalavra) {
      if (ColocarPalavra === SelecionarPalavra) {
        alert("Você venceu! A palavra é: " + SelecionarPalavra);
        changeScreen("home");
      } else {
        alert("Palavra incorreta! Tente novamente.");
        setColocarPalavra("");
      }
    }
  };

  const renderForca = () => {
    const ForcaParts = ["   0   ", "   |   ", "  /|\\  ", "   |   ","   |   ","  / \\  "];

    return ForcaParts.slice(0, 6 - Tentativas).map((part, index) => (
      <Text key={index} style={styles.ForcaPart}>
        {part}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Forca</Text>
      <View style={styles.wordContainer}>
        <Text style={styles.word}>{Chute}</Text>
      </View>
      <View style={styles.ForcaContainer}>{renderForca()}</View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma letra"
          onChangeText={handleletraInput}
          value={ColocarLetra}
          maxLength={1}
        />
        <Button title="Adivinhar Letra" onPress={handleGuessletra} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite a palavra"
          onChangeText={handleWordInput}
          value={ColocarPalavra}
        />
        <Button title="Adivinhar Palavra" onPress={handleGuessWord} />
      </View>
      <Text style={styles.LetrasUsadas}>
        Letras usadas: {LetrasUsadas.join(", ")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  wordContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  word: {
    fontSize: 36,
    fontWeight: "bold",
    letraSpacing: 10,
  },
  ForcaContainer: {
    flexDirection: "column",
    marginBottom: 20,
  },
  ForcaPart: {
    fontSize: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: 150,
    marginRight: 10,
  },
  LetrasUsadas: {
    fontSize: 18,
  },
});

export default Forca;
