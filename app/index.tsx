import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Sign_In from "./auth/SignIn";
import { useState } from "react";
import Welcome from "./landingPage";
import { Link, router } from "expo-router";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);

  const handleSignIn = (name: string) => {
    setUserName(name);
  };
  return (
    <View style={styles.container}>
      {isSignedIn ? <Welcome userName={userName} /> : <Sign_In setIsSignedIn={setIsSignedIn} onSignInSuccess={handleSignIn} />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});