import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const navigate = useNavigation();

  // const handleLogin = async () => {
  //   try {
  //     navigate.navigate("Instagram");
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png",
          }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username, email, or mobile number"
            placeholderTextColor="#808080"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#808080"
            secureTextEntry
          />
        </View>

        <TouchableHighlight
          style={styles.button}
          onPress={() => navigate.navigate("Tab")}
          underlayColor="#1491e2"
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableHighlight>

        <Text style={styles.forgotPassword}>Forgot password?</Text>

        <Pressable
          style={styles.buttonRegister}
          onPress={() => navigate.navigate("Register")}
        >
          <Text style={styles.buttonTextReg}>Create new account</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#0095f6",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonRegister: {
    width: "100%",
    borderColor: "#0095f6",
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonTextReg: {
    color: "#0095f6",
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#6e6e6e",
    fontSize: 14,
    marginBottom: 20,
  },
});
