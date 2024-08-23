import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import HomeStackScreen from "./components/HomeStackNavigator";
import ProfileScreen from "./ProfileScreen";
import AddPostForm from "./AddPostScreen";
import UserSearch from "./SearchScreen";

const Tab = createBottomTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: "https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=000000",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Seach"
        component={UserSearch}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: "https://img.icons8.com/?size=100&id=7695&format=png&color=000000",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={AddPostForm}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: () => (
            <Image
              style={{ width: 24, height: 24 }}
              source={{
                uri: "https://img.icons8.com/?size=100&id=84991&format=png&color=000000",
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <FontAwesome name="user-o" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
