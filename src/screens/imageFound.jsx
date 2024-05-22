import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ingredients from "./Ingredients";
import Steps from "./Steps";
import { useEffect } from "react";

const Tab = createMaterialTopTabNavigator();

export default function ImageFound({ route }) {
useEffect(()=> console.log(route),[])
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingTop: 30,
          marginBottom: -20 // Adjust the padding top value as per your requirement
        },
      }}
    >
      <Tab.Screen name="Ingredients" component={Ingredients} initialParams={{ "ingredients":route?.params?.food?.ingredients }} />
      <Tab.Screen name="Steps" component={Steps} initialParams={{ "steps":route?.params?.food?.steps }} />
    </Tab.Navigator>
  );
}
