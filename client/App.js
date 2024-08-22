import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    // <ApolloProvider>
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Instagram" component={HomeScreen} /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </ApolloProvider>
  );
}
