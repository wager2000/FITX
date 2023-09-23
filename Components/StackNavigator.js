import * as React from "react";
import billing from "./stackComponents/billing";
import account from "./stackComponents/account";
import DetailsScreen from "./DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';

//Her instantieres en StackNavigator.
const Stack = createStackNavigator()

/*
* I return() placeres en Stack.Navigator komponent, som i 'initialRoutName' henviser til DetailsScreen.
* Dernæst fastsættes tre Screens i Stacken. Disse er DetailsScreen, ScreenOne og ScreenTwo
* Hver Screen har individuel Styling qf den fremviste header.
 */
function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Details"
        >
            <Stack.Screen name="Details" component={DetailsScreen}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#ba6262'}}
                          }
            />
            <Stack.Screen name="account" component={account} options={{
                headerTitleStyle: { textAlign: 'right', color: 'white' },
                headerStyle: {backgroundColor: '#62bab5'}
            }} />
            <Stack.Screen name="billing" component={billing} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#628bba'}
            }}
            />
        </Stack.Navigator>
    )
}

//Eksport af den funktionelle komponent, således den kan importeres i andre komponenter
export default StackNavigator
