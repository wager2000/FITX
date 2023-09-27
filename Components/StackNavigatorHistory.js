//Viktor
//Importerer de nødvendige funktioner fra react, samt de forskellige komponenter.
import * as React from "react";
import Billing from "./stackComponentsDetails/Billing";
import Account from "./stackComponentsDetails/Account";
import Settings from "./stackComponentsDetails/Settings";
import KommendeArrangementer from "./stackComponentHistory/KommendeArrangementer";
import AfsluttedeArrangementer from "./stackComponentHistory/AfsluttedeArrangementer";
import History from "./History";
import { createStackNavigator } from "@react-navigation/stack";

//Stacknavigator defineres.
const Stack = createStackNavigator();

//Stacknavigateren sættes ind i funktion, hvor der defineres at DetailsScreen.js er det første komponent der skal fremvises.
//I Stacknavigateren henvises til de forskellige komponenter, som skal vises i UI.
//I komponenterne er der også placeret options, som definerer hvordan headeren skal se ud.

function StackNavigatorHistory() {
  return (
    <Stack.Navigator initialRouteName="History">
      <Stack.Screen
        name="Here is an overview of all your sessions"
        component={History}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#659EC7" },
        }}
      />
      <Stack.Screen
        name="KommendeArrangementer"
        component={KommendeArrangementer}
        options={{
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#87AFC7" },
        }}
      />
      <Stack.Screen
        name="AfsluttedeArrangementer"
        component={AfsluttedeArrangementer}
        options={{
          headerTitleStyle: { color: "black" },
          headerStyle: { backgroundColor: "#87AFC7" },
        }}
      />
    </Stack.Navigator>
  );
}


export default StackNavigatorHistory;
