import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, gql } from "@apollo/client";

const ADD_POST = gql`
  mutation AddPost($input: CreatePostInput!) {
    addPost(input: $input) {
      _id
      content
      tags
      imgUrl
      authorId
      createdAt
      updatedAt
    }
  }
`;

export default function AddPostForm() {
  const [caption, setCaption] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [addPost, { loading, error }] = useMutation(ADD_POST);

  const handleAddTag = () => {
    if (tagInput) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handlePost = async () => {
    try {
      await addPost({
        variables: {
          input: {
            content: caption,
            imgUrl,
            tags,
          },
        },
      });
      setCaption("");
      setImgUrl("");
      setTags([]);
    } catch (err) {
      console.error("Post creation error:", err);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Create New Post</Text>

          <TextInput
            style={styles.input}
            placeholder="Write a caption..."
            value={caption}
            onChangeText={setCaption}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Image URL..."
            value={imgUrl}
            onChangeText={setImgUrl}
          />

          <View style={styles.tagContainer}>
            <TextInput
              style={styles.input}
              placeholder="Add a tag..."
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={handleAddTag}
            />
            <TouchableOpacity
              style={styles.addTagButton}
              onPress={handleAddTag}
            >
              <Ionicons name="add-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.tagsList}>
            {tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={handlePost}>
            {loading ? (
              <Text style={styles.shareButtonText}>Posting...</Text>
            ) : (
              <Text style={styles.shareButtonText}>Share Post</Text>
            )}
          </TouchableOpacity>

          {error && (
            <Text style={styles.errorText}>Error: {error.message}</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    color: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: "#ddd",
    fontSize: 16,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  addTagButton: {
    backgroundColor: "#1DA1F2",
    padding: 10,
    borderRadius: 30,
    marginLeft: 10,
    alignItems: "center",
  },
  tagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#eee",
    color: "#333",
    padding: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  shareButton: {
    backgroundColor: "#1DA1F2",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  shareButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    marginTop: 20,
    textAlign: "center",
  },
});
