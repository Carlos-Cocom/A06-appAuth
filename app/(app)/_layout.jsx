import { Text, View, ActivityIndicator } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "../../ctx"; 

export default function AppLayout() {
  const { userSession, isLoading } = useSession(); 

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!userSession) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitle: "Todo App",
        headerRight: () => <Text>Bienvenido</Text>,
      }}
    />
  );
}
