//Importerer de nødvendige funktioner fra react, samt de forskellige komponenter.
import * as React from "react";
import SearchScreen from "../SearchScreen";
import EventScreen from "../stackComponentsSearch/EventScreen";

import { createStackNavigator } from "@react-navigation/stack";

//Stacknavigator defineres.
const Stack = createStackNavigator();

//Stacknavigateren sættes ind i funktion, hvor der defineres at DetailsScreen.js er det første komponent der skal fremvises.
//I Stacknavigateren henvises til de forskellige komponenter, som skal vises i UI.
//I komponenterne er der også placeret options, som definerer hvordan headeren skal se ud.
function StackNavigatorSearch() {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="Explore the places"
        component={SearchScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#659EC7" },
        }}
      />
      <Stack.Screen
        name="EventScreen"
        component={EventScreen}
        options={{
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#87AFC7" },
        }}
      />
      
    
    </Stack.Navigator>
  );
}

export default StackNavigatorSearch;
