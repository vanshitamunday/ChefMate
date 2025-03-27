import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import supabase from "./lib/supabase";
import supabase from "../../lib/supabase";

type Sign_InProps = { 
  setIsSignedIn: (isSignedIn: boolean) => void;
  onSignInSuccess: (userName: string) => void;
};

const image = require("../assets/loginBackground.jpg");

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const Sign_In: React.FC<Sign_InProps> = ({ setIsSignedIn, onSignInSuccess }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if(!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    if(!validatePassword(password)) {
      Alert.alert("Invalid Password", "Password must be at least 8 characters long, include upper and lowercase, a number, and a special character");
      return;
    }

    try{
      const{data,error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if(error) {
        Alert.alert("Login error", error.message);
        return;
      }
      console.log("Querying with", data.user.id);
      const {data: userData, error: userError} = await supabase
      .from("user_details")
      .select("first_name")
      .eq("uuid", data.user.id)
      .single();
      if(userError || !userData) {
        Alert.alert("Error", "Could not fetch user data");
        console.log('Error fetching user data,', userError, userData);
        return;
      }
      setIsSignedIn(true);
      onSignInSuccess(userData.first_name);
    } catch (err) {
      Alert.alert("Error", "An unexpected error occured");
      console.error("Login failed", err);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["left", "right"]}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Text style={styles.textAbove}>Log In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.text}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/signup")}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Sign_In;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
  textAbove: {
    color: "white",
    fontSize: 36,
  },
  input: {
    height: 60,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "lightblue",
    height: 50,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
});