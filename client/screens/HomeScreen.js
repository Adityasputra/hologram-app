import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export default function HomeScreen() {
  const { data, loading, error, refetch } = useQuery(GET_POSTS);
  const [likePost] = useMutation(LIKE_POST);
  const navigation = useNavigation();

  const handleToDetail = (postId) => {
    navigation.navigate("PostDetail", { postId });
  };

  const handleLikePost = async (postId) => {
    try {
      await likePost({
        variables: { postId },
      });
      refetch();
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error fetching posts</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data?.getPosts || []}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleToDetail(item._id)}>
            <View style={styles.postContainer}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: "https://via.placeholder.com/100" }}
                  style={styles.profileImage}
                />
                <Text style={styles.username}>{item.authorId}</Text>
              </View>

              <Image source={{ uri: item.imgUrl }} style={styles.postImage} />

              <View style={styles.postDetails}>
                <View style={styles.likesContainer}>
                  <Pressable onPress={() => handleLikePost(item._id)}>
                    <AntDesign
                      name={(item.likes?.length || 0) > 0 ? "heart" : "hearto"}
                      size={20}
                      color={(item.likes?.length || 0) > 0 ? "red" : "black"}
                    />
                  </Pressable>
                  <Text style={styles.likes}>{item.likes?.length || 0}</Text>
                  <Fontisto name="comment" size={20} color="black" />
                  <Text style={styles.likes}>{item.comments?.length || 0}</Text>
                  <AntDesign name="sharealt" size={20} color="black" />
                </View>

                <Text style={styles.caption}>{item.content}</Text>
                <Text style={styles.tags}>{item.tags?.join(", ")}</Text>
                <Text style={styles.comments}>
                  View All {item.comments?.length || 0} comments
                </Text>
                <Text style={styles.timestamp}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  postContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 0.3,
    borderColor: "#ccc",
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 40,
    marginLeft: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    padding: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 5,
    marginBottom: 5,
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
    fontWeight: "bold",
  },
  tags: {
    marginTop: 5,
    fontStyle: "italic",
  },
  comments: {
    color: "gray",
    marginTop: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
