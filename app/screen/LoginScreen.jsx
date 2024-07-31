import React, { useState } from "react";
import { StyleSheet, ToastAndroid, View } from "react-native";
import { Text } from "react-native-paper";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import Header from "../components/login/Header";
import TextInput from "../components/login/TextInput";
import Button from "../components/login/Button";
import { theme } from "../core/theme";
import Background from "../components/login/Background";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { login } = useAuth();

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    try {
      await login(email.value, password.value).then((res) => {
        ToastAndroid.show("Inicio de sesión exitoso", ToastAndroid.SHORT);
        router.replace("/screen/Home");
      });
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  };

  return (
    <Background>
      <Header>Bienvenido</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Email address"
      />
      <TextInput
        label="password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        description="password"
      />
      <View style={styles.forgotPassword}>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </View>
      <Button style={{}} mode="contained" onPress={onLoginPressed}>
        Iniciar Sesion
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <Text style={styles.link}>Sign up</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
