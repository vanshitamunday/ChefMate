import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#007BFF" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      {/* Define all screens in this stack */}
      <Stack.Screen name="index" options={{ title: "Login" }} />
    </Stack>
  );
}