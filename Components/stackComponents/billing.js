import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

/*
*billing er den ene af de tre screens i StackNavigatoren
* billing præsenterer en tekst, der beskriver, hvor brugeren befinder sig samt
* returnerer to <Button/>, som benyttes til henholdsvis at navigere tilbage til sidste Screen og
* navigere ind til den anden screen i stackComponents
* Slutteligt er der inkluderet styling til komponenterne
 */
function billing({ navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Screen One!</Text>
            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column'}}>
                <View style={{margin: '2%'}} >
                    <Button title="Go Back" onPress={() => navigation.goBack() } />
                </View>
                <View style={{margin: '2%'}} >
                    <Button title="Go To Screen Two" onPress={() => navigation.navigate('ScreenTwo')}  />
                </View>
            </View>
        </View>
    );
}
//Eksport af Screen således den kan importeres- og bruges i andres komponenter
export default billing


//Lokal styling til brug i billing
const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
    },
});
