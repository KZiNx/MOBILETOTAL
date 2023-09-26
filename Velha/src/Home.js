import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Home({ mudarNomesJogadores }) {

    const { jogador1, setJogador1 } = useState("");
    const { jogador2, setJogador2 } = useState("");

    const handleClick = () => {
        if (mudarNomesJogadores) {
            mudarNomesJogadores(jogador1, jogador2)
            changeScreen("jogo")
        }
    }
    return (
        <View style={styles.container}>

            <TextInput placeholder='Jogador 1' value={jogador1} onChangeText={setJogador1} />
            <Text> O nome do jogador 1 é: {jogador1}</Text>

            <TextInput placeholder='Jogador 2' value={jogador2} onChangeText={setJogador2} />
            <Text> O nome do jogador 2 é: {jogador2}</Text>

            <Button title='Click' onPress={handleClick} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '09f',
        alignItems: 'center',
        justifyContent: 'center',

    },
});