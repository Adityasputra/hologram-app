import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function register() {}

export default function RegisterScreen() {
  const navigate = useNavigation();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Enter your data:</Text>
          <Text style={styles.subTitle}>
            Enter your data where you want other users to recognize you.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#808080"
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#808080"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#808080"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#808080"
            secureTextEntry
          />

          <TouchableHighlight
            style={styles.button}
            onPress={() => navigate.navigate("Login")}
            underlayColor="#1491e2"
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableHighlight>

          <Pressable style={styles.buttonRegister} onPress={register}>
            <Text style={styles.buttonTextReg}>Sign up with Google</Text>
          </Pressable>
        </View>
        <Text
          style={styles.haveAnAccount}
          onPress={() => navigate.navigate("Login")}
        >
          I already have an account?
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  title: {
    fontSize: 25,
    paddingBottom: 5,
  },
  subTitle: {
    paddingBottom: 20,
    color: "#6e6e6e",
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
  haveAnAccount: {
    color: "#6e6e6e",
    fontSize: 14,
    marginTop: 20,
  },
});
