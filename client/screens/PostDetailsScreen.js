import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { gql, useQuery } from "@apollo/client";

const GET_POST_BY_ID = gql`
  query GetPostById($postId: ID!) {
    getPostById(postId: $postId) {
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

export default function PostDetailScreen({ route }) {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const { data, loading, error } = useQuery(GET_POST_BY_ID, {
    variables: { postId },
  });

  const handleSubmitComment = async () => {
    if (comment.trim()) {
      console.log("Submitting comment:", comment);
      setComment("");
    }
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#000" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (error) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text>Error fetching post details</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  const post = data?.getPostById;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image source={{ uri: post.imgUrl }} style={styles.postImage} />

          <View style={styles.postDetails}>
            <View style={styles.likesContainer}>
              <AntDesign name="hearto" size={20} color="black" />
              <Text style={styles.likes}>{post.likes.length}</Text>
              <Fontisto name="comment" size={20} color="black" />
              <Text style={styles.likes}>{post.comments.length}</Text>
              <AntDesign name="sharealt" size={20} color="black" />
            </View>
          </View>

          <View style={styles.captionContainer}>
            <Text style={styles.captionUs}>
              <Text style={styles.username}>{post.authorId}</Text>
            </Text>
            <Text style={styles.captionText}>{post.content}</Text>
            <Text style={styles.tags}>{post.tags.join(", ")}</Text>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsHeader}>Comments:</Text>
            {post.comments.map((comment, index) => (
              <View key={index} style={styles.comment}>
                <Text style={styles.commentUsername}>{comment.username}:</Text>
                <Text style={styles.commentContent}>{comment.content}</Text>
              </View>
            ))}
          </View>

          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              value={comment}
              onChangeText={setComment}
              placeholder="Add a comment..."
            />
            <TouchableOpacity onPress={handleSubmitComment}>
              <Text style={styles.submitButton}>Post</Text>
            </TouchableOpacity>
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
  scrollViewContent: {
    paddingBottom: 20,
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  postDetails: {
    padding: 10,
  },
  likesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes: {
    fontWeight: "bold",
    paddingRight: 5,
  },
  captionContainer: {
    padding: 10,
  },
  captionUs: {
    fontWeight: "bold",
    fontSize: 16,
  },
  username: {
    fontWeight: "bold",
  },
  captionText: {
    marginTop: 5,
    fontSize: 16,
  },
  tags: {
    marginTop: 5,
    fontStyle: "italic",
  },
  commentsSection: {
    padding: 10,
  },
  commentsHeader: {
    fontWeight: "bold",
  },
  comment: {
    flexDirection: "row",
    marginBottom: 5,
  },
  commentUsername: {
    fontWeight: "bold",
  },
  commentContent: {
    marginLeft: 5,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  submitButton: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
