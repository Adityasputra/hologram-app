import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function PostDetailScreen() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmitCommentar = async () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, username: "Adityasputra_cv", text: comment },
      ]);
      setComment("");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image
            source={{
              uri: "https://embed.pixiv.net/spotlight.php?id=6822&lang=en",
            }}
            style={styles.postImage}
          />

          <View style={styles.postDetails}>
            <View style={styles.likesContainer}>
              <AntDesign name="hearto" size={20} color="black" />
              <Text style={styles.likes}>100</Text>
              <Fontisto name="comment" size={20} color="black" />
              <Text style={styles.likes}>100</Text>
              <AntDesign name="sharealt" size={20} color="black" />
            </View>
          </View>

          <View style={styles.captionContainer}>
            <Text style={styles.captionUs}>
              <Text style={styles.username}>Adityasputra_cv</Text>
            </Text>
            <Text style={styles.captionText}>Description:</Text>
            <Text>
              This is the caption of the post. It can be multiple lines and
              provide more details about the post. This is the caption of the
              post. It can be multiple lines and provide more details about the
              post. This is the caption of the post. It can be multiple lines
              and provide more details about the post.
            </Text>
          </View>

          <View style={styles.commentContainer}>
            <Text style={styles.titleComments}>Comments</Text>
            {comments.map((comment) => (
              <Text key={comment.id} style={styles.comment}>
                <Text style={styles.commentUsername}>{comment.username} </Text>
                <Text>{comment.text}</Text>
              </Text>
            ))}
          </View>
        </ScrollView>

        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            placeholder="Add a comment..."
            placeholderTextColor="gray"
            keyboardType="default"
            onSubmitEditing={() => handleSubmitCommentar()}
          />
          <TouchableOpacity onPress={handleSubmitCommentar}>
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=100004&format=png&color=007AFF",
              }}
              style={styles.sendIcon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    gap: 5,
  },
  likes: {
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 15,
  },
  captionContainer: {
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  captionUs: {
    lineHeight: 20,
  },
  captionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentContainer: {
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  comment: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  titleComments: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  commentUsername: {
    fontWeight: "bold",
    marginRight: 5,
  },
  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
  commentInput: {
    flex: 1,
    borderRadius: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    color: "#000",
  },
  sendIcon: {
    width: 24,
    height: 24,
  },

  username: {
    fontWeight: "bold",
  },
});
