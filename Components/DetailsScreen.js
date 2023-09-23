import {Button, StyleSheet, Text, View} from "react-native";
import * as React from "react";

/*
* Metode til at navigere på baggrund af de argumenter, som der sendes med i metode
* Metodens logik udnytter den prædefinerede metode, 'navigate', som navigere ind til det den komponent,
* der hænger sammen med det overførte rutenavn
 */
const navController = (navigation, route) =>{
    navigation.navigate(route)
}


/*
 * DetailsScreen tager 'navigation' med som argument. navigation er en automatisk prædefineret prop, der kan refereres til i alle screen komponenter.
 *Se dokumentationen for mere info: https://reactnavigation.org/docs/navigation-prop/
 *
 *Derudover styles DetailsScreen, som indeholder omfatter to button komponenter, der benytters til at aktivere vores navController metode
 */
function DetailsScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>DetailsScreen!</Text>
            <Button title="Go To your account" onPress={() => navController(navigation, 'account')}  />
            <Button title="Go To your billings information" onPress={() => navController(navigation, 'billing')}  />
        </View>
    );
}

export default DetailsScreen


//Lokal styling til brug i DetailsScreen.
const styles = StyleSheet.create({
    container: {
        paddingTop:100,
        paddingBottom:100,
        borderColor: 'green',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height:'100%'
    },
    text: {
        fontSize: 20,
    },
});