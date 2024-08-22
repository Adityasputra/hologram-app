import { FlatList, View, StyleSheet, Text, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";

const posts = Array.from({ length: 20 }).map((_, index) => ({
  id: String(index + 1),
  username: `user_${index + 1}`,
  description: `Hello Nama saya adalah Hololive`,
  postImage: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
  likes: Math.floor(Math.random() * 100000) + 1000,
  comments: Math.floor(Math.random() * 100) + 10,
  caption: `Post user_${index + 1}`,
  timestamp: `Month ${index + 1}`,
}));

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
              <View style={styles.userInfo}>
                <Text style={styles.username}>{item.username}</Text>
              </View>
              <Image
                source={{ uri: item.postImage }}
                style={styles.postImage}
              />
              <View style={styles.postDetails}>
                <View style={styles.likesContainer}>
                  <AntDesign name="hearto" size={22} color="black" />
                  <Text style={styles.likes}>{item.likes}</Text>
                  <Fontisto name="comment" size={22} color="black" />
                  <Text style={styles.likes}>{item.comments}</Text>
                  <AntDesign name="sharealt" size={24} color="black" />
                </View>
                <Text style={styles.caption}>{item.caption}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.comments}>
                  View All {item.comments} comments
                </Text>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContect}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  postImage: {
    width: "100%",
    height: 300,
  },

  username: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 10
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  timestamp: {
    color: "gray",
    fontSize: 12,
    marginTop: 5,
  },

  likes: {
    fontWeight: "bold",
    paddingRight: 5,
  },

  postDetails: {
    padding: 10,
  },

  caption: {
    marginTop: 5,
  },

  comments: {
    color: "gray",
    marginTop: 5,
  },

  listContect: {
    paddingBottom: 20,
  },

  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
// centeredText: {
//   flex: 1,
//   justifyContent: "center",
//   alignItems: "center",
//   fontSize: 20,
// },
// });
