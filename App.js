import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import Landing from "./src/screens/landing";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />        
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={false} backgroundColor={'#6a717a'} />
    </>
  );
}
