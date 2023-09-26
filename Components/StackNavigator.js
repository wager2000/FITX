import * as React from "react";
import Billing from "./stackComponents/billing";
import Account from "./stackComponents/account";
import Settings from "./stackComponents/settings";
import DetailsScreen from "./DetailsScreen";
import { createStackNavigator } from '@react-navigation/stack';

//Her instantieres en StackNavigator.
const Stack = createStackNavigator()

/*
* I return() placeres en Stack.Navigator komponent, som i 'initialRoutName' henviser til DetailsScreen.
* Dernæst fastsættes tre Screens i Stacken. Disse er DetailsScreen, ScreenOne og ScreenTwo
* Hver Screen har individuel Styling qf den fremviste header.
 */
function StackNavigatorDetails() {
    return (
        <Stack.Navigator
            initialRouteName="Details"
        >
            <Stack.Screen name="All options" component={DetailsScreen}
                          options={{
                              headerTitleAlign: 'center',
                              headerTitleStyle: {color: 'white'},
                              headerStyle: {backgroundColor: '#659EC7'}}
                          }
            />
            <Stack.Screen name="Account" component={Account} options={{
                headerTitleStyle: { textAlign: 'right', color: 'white' },
                headerStyle: {backgroundColor: '#87AFC7'}
            }} />
            <Stack.Screen name="Billing" component={Billing} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#87AFC7'}
            }}
            />
            <Stack.Screen name="Settings" component={Settings} options={{
                headerTitleStyle: {color: 'black'},
                headerStyle: {backgroundColor: '#87AFC7'}
            }}
            />
       
        </Stack.Navigator>
    )
}

//Eksport af den funktionelle komponent, således den kan importeres i andre komponenter
export default StackNavigatorDetails
