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

export default function AddPostForm() {
  const [caption, setCaption] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handlePost = () => {};

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

          <TouchableOpacity style={styles.option}>
            <Ionicons name="pricetag-outline" size={24} color="#888" />
            <Text style={styles.optionText}>Add Tags</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={handlePost}>
            <Text style={styles.shareButtonText}>Share Post</Text>
          </TouchableOpacity>
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
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  optionText: {
    color: "#666",
    marginLeft: 10,
    fontSize: 16,
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
});
