import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Text} from "react-native";
import { Button } from "react-native";

export default function Jogo(props){

    let contador = "1";

     const [b1, setB1] = useState("");

    const handleClickGame = () =>{
        if(contador%2 === 0){
            setB1("X");
            contador++
        }else{
            setB1("O");
            contador++;
        }
    }

    const handleClick = ()=>{
        props.changeScream('home');
    }

    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Jogo</Text>
            <View style={styles.col1}>
                <Button title = {b1} style={styles.btn} onPress={handleClickGame} />
                <Text>"   "</Text>
                <Button title = {b1} style={styles.btn}/>
                <Text>"   "</Text>
                <Button title = {b1} style={styles.btn}/>
                
            </View>
            <View style={styles.col1}>
            <Button title = {b1} style={styles.btn} onPress={handleClickGame} />
                <Text>"   "</Text>
                <Button title = {b1} style={styles.btn}/>
                <Text>"   "</Text>
                <Button title = {b1} style={styles.btn}/>
       
            </View>
            <View style={styles.col1}>
            <Button title = {b1} style={styles.btn} onPress={handleClickGame} />
                <Text>"   "</Text>
                <Button title = {b1} style={styles.btn}/>
                <Text>"   "</Text>
                <Button title = {b1} style={styles.btn}/>
       
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        backgroundColor: '#44f',
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        color: "white",
        fontSize: 20,
      },
      col1: {
        flexDirection: "row",
      },
      btn: {
        width: 40,
        height: 40,
      }
});