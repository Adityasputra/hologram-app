import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../HomeScreen";

export default function HomeStackNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
