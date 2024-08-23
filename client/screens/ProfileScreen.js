import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.profileImage}
            />
            <View style={styles.statsContainer}>
              <Text style={styles.statsNumber}>1</Text>
              <Text style={styles.statsLabel}>Posts</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.statsNumber}>865</Text>
              <Text style={styles.statsLabel}>Followers</Text>
            </View>
            <View style={styles.statsContainer}>
              <Text style={styles.statsNumber}>297</Text>
              <Text style={styles.statsLabel}>Following</Text>
            </View>
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>Aditya Saputra</Text>
            <Text style={styles.bio}>Become 1% better every day</Text>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIcon}>
              <AntDesign name="adduser" size={20} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.tabBar}>
            <SimpleLineIcons name="grid" size={24} color="black" />
          </View>

          <View style={styles.postGrid}>
            {[...Array(18)].map((_, index) => (
              <Image
                key={index}
                source={{ uri: "https://via.placeholder.com/150" }}
                style={styles.postImage}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  statsContainer: {
    alignItems: "center",
    flex: 1,
  },
  statsLabel: {
    color: "gray",
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfoContainer: {
    paddingHorizontal: 15,
  },
  bio: {
    marginTop: 5,
    color: "gray",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  actionIcon: {
    padding: 8,
    backgroundColor: "#efefef",
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  actionButton: {
    flex: 1,
    padding: 8,
    backgroundColor: "#efefef",
    marginHorizontal: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  actionText: {
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#efefef",
  },
  postGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    paddingHorizontal: 1,
  },
  postImage: {
    width: "32%",
    height: 120,
    margin: 1,
  },
});
