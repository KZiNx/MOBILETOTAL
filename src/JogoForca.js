import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const palavras = ["programacao", "algoritmo", "linguagem", "desenvolvimento", "codigo", "software", "hardware", "rede", "internet", "servidor", "banco de dados", "seguranca", "programador", "debugger", "API", "interface", "sistema", "atualizacao", "dispositivo", "codigo-fonte", "depuracao", "automacao", "inovacao", "computador", "teclado", "mouse", "placa-mae", "armazenamento", "arquitetura", "nuvem", "analise", "virtualizacao", "backup", "criptografia", "autenticacao", "firewall", "proxy", "data center", "cliente", "servico", "processamento", "conectividade", "concorrencia", "requisito", "biblioteca", "framework", "engenharia", "gerenciamento"]

const JogoDaForca = ({ changeScreen }) => {
  const [PalavraSelecionada, setPalavraSelecionada] = useState("");
  const [Chute, setChute] = useState("");
  const [TentativasRestantes, setTentativasRestantes] = useState(6);
  const [LetraSelecionada, setLetraSelecionada] = useState("");
  const [PalavraChutada, setPalavraChutada] = useState("");
  const [LetrasUsadas, setLetrasUsadas] = useState([]);
  const [ParteDoCorpo, setParteDoCorpo] = useState(0);

  useEffect(() => {
    
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    setPalavraSelecionada(palavras[indiceAleatorio].toUpperCase());
  }, []);

  const Voltar = () => {
    changeScreen("home");
  };

  const handleLetraInput = (text) => {
    setLetraSelecionada(text.toUpperCase());
  };

  const handlePalavraInput = (text) => {
    setPalavraChutada(text.toUpperCase());
  };

  const handleChuteLetra = () => {
    if (LetraSelecionada && PalavraSelecionada) {
      const letra = LetraSelecionada[0];

      if (LetrasUsadas.includes(letra)) {
      
        return;
      }

      const arrayPalavra = PalavraSelecionada.split("");
      let novoChute = "";

      let letraCorreta = false;

      for (const caractere of arrayPalavra) {
        if (caractere === letra) {
          novoChute += caractere;
          letraCorreta = true;
        } else if (Chute.includes(caractere)) {
          novoChute += caractere;
        } else {
          novoChute += "_";
        }
      }

      setChute(novoChute);
      setLetrasUsadas([...LetrasUsadas, letra]);

      if (!letraCorreta) {
        setParteDoCorpo(ParteDoCorpo + 1);
      }

      if (!PalavraSelecionada.includes(letra)) {
        setTentativasRestantes(TentativasRestantes - 1);
      }

      if (novoChute === PalavraSelecionada) {
        alert("Você venceu! A palavra é: " + PalavraSelecionada);
        changescreen("home");
      } else if (TentativasRestantes === 0) {
        alert("Você perdeu! A palavra era: " + PalavraSelecionada);
        changescreen("home");
      }
    }

    setLetraSelecionada("");
  };

  const handleChutePalavra = () => {
    if (PalavraChutada && PalavraSelecionada) {
      if (PalavraChutada === PalavraSelecionada) {
        alert("Você venceu! A palavra é: " + PalavraSelecionada);
        changescreen("home");
      } else {
        alert("Palavra incorreta! Tente novamente.");
        setPalavraChutada("");
      }
    }
  };

  const renderForca = () => {
    const partesDaForca = [
      " ",
      "  +-----+\n  |           |\n              |\n              |\n              |\n              |\n===========",
      "  +-----+\n  |           |\n  O         |\n              |\n              |\n              |\n===========",
      "  +-----+\n  |           |\n  O         |\n  |           |\n              |\n              |\n===========",
      "  +-----+\n  |           |\n  O         |\n  /|          |\n              |\n              |\n===========",
      "  +-----+\n  |           |\n  O         |\n  /|\\        |\n              |\n              |\n===========",
      "  +-----+\n  |           |\n  O         |\n  /|\\        |\n  /           |\n              |\n===========",
      "  +-----+\n  |           |\n  O         |\n  /|\\        |\n  / \\        |\n              |\n===========",
    ];

    return (
      <Text style={styles.forcaParte}>
        {partesDaForca[ParteDoCorpo]}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Forca</Text>
      <View style={styles.containerPalavra}>
        <Text style={styles.palavra}>{Chute}</Text>
      </View>
      <View style={styles.containerForca}>{renderForca()}</View>
      <View style={styles.containerEntrada}>
        <TextInput
          style={styles.entrada}
          placeholder="Digite uma letra"
          onChangeText={handleLetraInput}
          value={LetraSelecionada}
          maxLength={1}
        />
        <Button title="Adivinhar Letra" onPress={handleChuteLetra} />
      </View>
      <View style={styles.containerEntrada}>
        <TextInput
          style={styles.entrada}
          placeholder="Digite a palavra"
          onChangeText={handlePalavraInput}
          value={PalavraChutada}
        />
        <Button title="Adivinhar Palavra" onPress={handleChutePalavra} />
      </View>
      <Text style={styles.letrasUsadas}>
        Letras usadas: {LetrasUsadas.join(", ")}
      </Text>
      <View style={styles.containerVoltar}>
      <Button title="Voltar" onPress={Voltar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00CED1",
    color: "white",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
  },
  containerPalavra: {
    flexDirection: "row",
    marginBottom: 20,
  },
  palavra: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 10,
  },
  containerForca: {
    flexDirection: "column",
    marginBottom: 20,
  },
  forcaParte: {
    fontSize: 24,
  },
  containerEntrada: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  entrada: {
    borderWidth: 1,
    borderColor: "#E0FFFF",
    padding: 10,
    width: 150,
    marginRight: 10,
  },
  letrasUsadas: {
    fontSize: 18,
  },
  containerVoltar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default JogoDaForca;
