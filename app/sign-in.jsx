import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, } from "react-native";
import { useSession } from "../ctx";
import { router } from "expo-router";

const correoCorrecto = "usuario@ejemplo.com";
const passwordCorrecto = "password123";

export default function SignIn() {
  const { signIn } = useSession();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (correo === correoCorrecto && password === passwordCorrecto) {
      signIn(correo);
      setTimeout(() => router.replace("/"), 500);
    } else {
      Alert.alert("Error", "Credenciales inválidas ❌");
    }
  };

  const showDevelopmentAlert = () => {
    Alert.alert("🚧 En desarrollo", "Esta funcionalidad aún no está disponible.");
  };

  return (
    <ImageBackground
      source={require("../assets/image.png")}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="email-address"
          value={correo}
          onChangeText={setCorreo}
          placeholderTextColor="gray"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="gray"
        />

        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={showDevelopmentAlert}>
            <Text style={styles.optionText}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={showDevelopmentAlert}>
            <Text style={styles.optionText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={showDevelopmentAlert}>
          <Text style={styles.createAccount}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "black",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#6200ea",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  optionText: {
    color: "black",
  },
  createAccount: {
    marginTop: 10,
    color: "black",
  },
});
