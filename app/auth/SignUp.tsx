import { useState } from "react";
import {
  Alert,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import supabase from "../lib/supabase";
const TABLE_NAME = "user_details";

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const validatePassword = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const SignUpForm = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signUpHandler = async () => {
    if (!validateEmail(email)) {
      Alert.alert(
        "Invalid Email",
        "Must enter a valid email address"
      );
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters long, include upper and lowercase, a number, and a special character"
      );
      return;
    }
    try {
      const {data, error} = await supabase.auth.signUp({
        email,
        password,
      });
      if(error) {
        Alert.alert("Sign up error: ", error.message);
        return;
      }
      if(data && data.user && data.user.id) {
        const userId = data.user.id;
        console.log("UUID from auth:", data.user.id);
        console.log("Inserting UUID:", data.user.id.toString());
        const {error: insertError} = await supabase.from(TABLE_NAME).insert({
          uuid: userId,
          first_name: fName,
          last_name: lName,
          email: email,
        });
        if(insertError) {
          console.error("Database error", insertError);
          Alert.alert("Database error", insertError.message);
          return;
        }
      } else {
        console.error("data.user is missing");
        Alert.alert("signup error", 
          "There was an issue with the sign up process."
        );
        return;
      }
      Alert.alert("Success!", "Signup Succesful!");
    } catch(err) {
      Alert.alert("Error", "An unexpected error occurred.");
      console.error("Sign up failed:", err);
    }

  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fName}
        onChangeText={setFName}
        autoCapitalize="none" // Prevent auto-capitalization of the first letter
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lName}
        onChangeText={setLName}
        autoCapitalize="none" // Prevent auto-capitalization of the first letter
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" // Prevent auto-capitalization of the first letter
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide the password characters
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={signUpHandler}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
  },
  input: {
    height: 60,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
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