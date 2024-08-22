import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TabScreen from "./screens/TabScreen";

export default function App() {
  const Stack = createStackNavigator();
  return (
    // <ApolloProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tab"
          component={TabScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    // </ApolloProvider>
  );
}
