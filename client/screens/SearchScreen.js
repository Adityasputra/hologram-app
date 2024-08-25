import React, { useState, useEffect, useCallback } from "react";
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
import { gql, useQuery, useMutation } from "@apollo/client";
import debounce from "lodash.debounce";

const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      _id
      name
      username
      email
    }
  }
`;

const FOLLOW_USER = gql`
  mutation FollowUser($followingId: ID!) {
    followUser(followingId: $followingId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($followingId: ID!) {
    unfollowUser(followingId: $followingId)
  }
`;

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  const { data, refetch } = useQuery(SEARCH_USERS, {
    variables: { query: searchQuery },
    skip: searchQuery.length < 2,
    fetchPolicy: "network-only",
  });

  const [followUser] = useMutation(FOLLOW_USER);
  const [unfollowUser] = useMutation(UNFOLLOW_USER);

  useEffect(() => {
    if (data && data.searchUsers) {
      setUsers(data.searchUsers);
    }
  }, [data]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      refetch({ query });
    }, 300),
    []
  );

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const toggleFollow = async (id, followed) => {
    try {
      if (followed) {
        await unfollowUser({ variables: { followingId: id } });
      } else {
        await followUser({ variables: { followingId: id } });
      }
      refetch();
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
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
                <Text style={styles.userUsername}>{item.username}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  { backgroundColor: item.followed ? "#999" : "#1e90ff" },
                ]}
                onPress={() => toggleFollow(item._id, item.followed)}
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
  userUsername: {
    fontSize: 14,
    color: "#888",
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
