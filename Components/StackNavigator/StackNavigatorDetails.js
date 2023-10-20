//Viktor
//Importerer de nødvendige funktioner fra react, samt de forskellige komponenter.
import * as React from "react";
import Billing from "../stackComponentsDetails/Billing";
import Account from "../stackComponentsDetails/Account";
import Settings from "../stackComponentsDetails/Settings";
import PrivacySettings from "../stackComponentsDetails/PrivacySettings";
/*import Billing from "./stackComponents/Billing";
import Account from "./stackComponents/Account";
import Settings from "./stackComponents/Settings";*/
import DetailsScreen from "../DetailsScreen";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "../stackComponentsDetails/Camera";

//Stacknavigator defineres.
const Stack = createStackNavigator();

//Stacknavigateren sættes ind i funktion, hvor der defineres at DetailsScreen.js er det første komponent der skal fremvises.
//I Stacknavigateren henvises til de forskellige komponenter, som skal vises i UI.
//I komponenterne er der også placeret options, som definerer hvordan headeren skal se ud.
function StackNavigatorDetails() {
  return (
    <Stack.Navigator initialRouteName="Details">
      <Stack.Screen
        name="All Options"
        component={DetailsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#659EC7" },
        }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#87AFC7" },
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerTitleStyle: { textAlign: "right", color: "white" },
          headerStyle: { backgroundColor: "#87AFC7" },
        }}
      />
      <Stack.Screen
        name="Billing"
        component={Billing}
        options={{
          headerTitleStyle: { color: "black" },
          headerStyle: { backgroundColor: "#87AFC7" },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitleStyle: { color: "black" },
          headerStyle: { backgroundColor: "#87AFC7" },
        }}
      />
      <Stack.Screen
        name="PrivacySettings"
        component={PrivacySettings}
        options={{
          headerTitleStyle: { color: "black" },
          headerStyle: { backgroundColor: "#87AFC7" },
        }}
      />
    </Stack.Navigator>
    

  );
}

export default StackNavigatorDetails;
