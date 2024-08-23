import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../HomeScreen";
import PostDetailScreen from "../PostDetailsScreen";

const Stack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Instagram"
        component={HomeScreen}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ title: "Post Detail" }}
      />
    </Stack.Navigator>
  );
}
