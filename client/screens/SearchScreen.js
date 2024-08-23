import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Nanashi Mumei",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "2",
      name: "Cares Fauna",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "3",
      name: "Hakos Baelz",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "4",
      name: "Ouro Kronii",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "5",
      name: "IRyS",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "6",
      name: "Nanashi Mumei",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "7",
      name: "Cares Fauna",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "8",
      name: "Hakos Baelz",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "9",
      name: "Ouro Kronii",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
    {
      id: "10",
      name: "IRyS",
      followed: false,
      profileImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
    },
  ]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFollow = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, followed: !user.followed } : user
      )
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Image
                source={{ uri: item.profileImage }}
                style={styles.profileImage}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  { backgroundColor: item.followed ? "#999" : "#1e90ff" },
                ]}
                onPress={() => toggleFollow(item.id)}
              >
                <Text style={styles.followButtonText}>
                  {item.followed ? "Following" : "Follow"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#f4f4f4",
    color: "#333",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  followButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: "#1e90ff",
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
