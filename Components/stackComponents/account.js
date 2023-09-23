import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

//Identisk med ScreenOne

/*
*account er den ene af de tre screens i StackNavigatoren
* accountPræsenterer en tekst, der beskriver, hvor brugern befinder sig samt
* returnerer to <Button/> som benyttes til henholdsvis at navigere tilbage til sidste Screen og
* navigere ind til den anden screen i stackComponents
* Slutteligt er der inkludere stylig til komponenterne
 */
function account({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Screen Two!</Text>
            <View style={{display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
                <View style={{margin: '2%'}} >
                    <Button title="Go Back" onPress={() => navigation.goBack() } />
                </View>
                <View style={{margin: '2%'}} >
                    <Button title="Go To Screen One" onPress={() => navigation.navigate('ScreenOne')}  />
                </View>
            </View>
        </View>
    );
}
//Eksport af Screen således den kan importeres- og bruges i andres komponenter
export default account

//Lokal styling til brug i account
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
