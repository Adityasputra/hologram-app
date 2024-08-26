import React, { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_POST_BY_ID = gql`
  query GetPostById($postId: ID!) {
    getPostById(id: $postId) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
      }
      likes {
        username
        createdAt
      }
      createdAt
    }
  }
`;

const COMMENT_POST = gql`
  mutation CommentPost($postId: ID!, $content: String!) {
    commentPost(postId: $postId, content: $content) {
      _id
      authorId
      content
      createdAt
      updatedAt
    }
  }
`;

export default function PostDetailScreen({ route }) {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const { data, loading, error, refetch } = useQuery(GET_POST_BY_ID, {
    variables: { postId },
  });

  const [commentPost, { loading: commentLoading }] = useMutation(COMMENT_POST, {
    onCompleted: () => {
      setComment("");
      refetch();
    },
    onError: (err) => {
      console.error("Error posting comment:", err.message);
    },
  });

  const handleSubmitComment = async () => {
    if (comment.trim()) {
      try {
        await commentPost({
          variables: { postId, content: comment },
        });
      } catch (err) {
        console.error("Error submitting comment:", err.message);
      }
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
    console.error("Error fetching post details:", error.message);
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error fetching post details: {error.message}</Text>
      </SafeAreaView>
    );
  }

  const post = data?.getPostById;

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No post found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image source={{ uri: post.imgUrl }} style={styles.postImage} />

        <View style={styles.postDetails}>
          <View style={styles.likesContainer}>
            <Text style={styles.likes}>{post.likes?.length || 0} Likes</Text>
            <Text style={styles.comments}>
              {post.comments?.length || 0} Comments
            </Text>
          </View>

          <Text style={styles.caption}>
            <Text style={styles.username}>{post.authorId}</Text>
            {` ${post.content}`}
          </Text>
          <Text style={styles.tags}>{post.tags?.join(", ")}</Text>
          <Text style={styles.timestamp}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsHeader}>Comments:</Text>
          {post.comments?.map((comment, index) => (
            <View key={index} style={styles.comment}>
              <Text style={styles.commentUsername}>{comment.username}:</Text>
              <Text style={styles.commentContent}>{comment.data.content}</Text>
            </View>
          ))}
        </View>

        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            editable={!commentLoading}
          />
          <TouchableOpacity
            onPress={handleSubmitComment}
            disabled={commentLoading}
          >
            <Text style={styles.submitButton}>
              {commentLoading ? "Posting..." : "Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  comments: {
    color: "gray",
    marginLeft: 10,
  },
  caption: {
    marginTop: 5,
    fontWeight: "bold",
  },
  tags: {
    marginTop: 5,
    fontStyle: "italic",
  },
  timestamp: {
    color: "gray",
    fontSize: 12,
    marginTop: 5,
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
