import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";

interface WelcomeProps {
  userName: string | null;
}
const Welcome: React.FC<WelcomeProps> = ({userName}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome To the page</Text>
      <Text style={styles.text}>{userName || "User"}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/lab_3")}
      >
        <Text>Go to Lab 3</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(tabs)/calgary")}
      >
        <Text>Go to Assignment 2</Text>
      </TouchableOpacity>
      <Pressable 
      style={styles.button}
      onPress={() => router.push("/lab_4")}>
        <Text>Go to lab 4</Text>
      </Pressable>
      <Pressable 
      style={styles.button}
      onPress={() => router.push("/lab_5")}>
        <Text>Go to lab 5</Text>
      </Pressable>
      <Pressable 
      style={styles.button}
      onPress={() => router.push("/lab_6")}>
        <Text>Go to lab 6</Text>
      </Pressable>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 160,
    marginBottom: 15,
  },
  text: {
    fontSize: 24,
    padding: 10,
    margin: 10,
  },
});