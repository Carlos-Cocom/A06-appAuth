import { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, StyleSheet, } from "react-native";
import * as SQLite from "expo-sqlite";
import { useSession } from "../../ctx";
import { Stack } from "expo-router";

const db = SQLite.openDatabaseSync("tasks.db");

export default function Index() {
  const { signOut } = useSession();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    db.execAsync(
      "CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
    )
      .then(() => loadTasks())
      .catch((error) => console.log("Error creating table:", error));
  }, []);

  const addTask = () => {
    if (!task.trim()) {
      Alert.alert("⚠️ Error", "Ingresa una tarea válida.");
      return;
    }

    if (task.length > 30) {
      setErrorMessage("Máximo 30 caracteres permitidos.");
      return;
    }

    db.runAsync("INSERT INTO tasks (name) VALUES (?)", [task])
      .then(() => {
        setTask("");
        setErrorMessage(""); // Limpiar error al registrar bien la tarea
        loadTasks();
      })
      .catch((error) => console.log("Error adding task:", error));
  };

  const loadTasks = () => {
    db.getAllAsync("SELECT * FROM tasks")
      .then((rows) => setTasks(rows))
      .catch((error) => console.log("Error loading tasks:", error));
  };

  const deleteTask = (id) => {
    db.runAsync("DELETE FROM tasks WHERE id = ?", [id])
      .then(() => {
        Alert.alert("Tarea Eliminada", "La tarea ha sido eliminada.");
        loadTasks();
      })
      .catch((error) => console.log("Error deleting task:", error));
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Todo App",
          headerRight: () => (
            <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.container}>
        <Text style={styles.title}>Gestión de Tareas</Text>

        <TextInput
          placeholder="Nueva tarea... (Maximo 30 caracteres)"
          value={task}
          onChangeText={(text) => {
            setTask(text);
            if (text.length > 30) {
              setErrorMessage("Máximo 30 caracteres permitidos.");
            } else {
              setErrorMessage("");
            }
          }}
          style={styles.input}
          maxLength={30}
        />

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <Button title="Agregar Tarea" onPress={addTask} />

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text style={styles.taskText}>{item.name}</Text>
              <Button title="❌" onPress={() => deleteTask(item.id)} />
            </View>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9282D0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: '#ccc5f4',
    borderRadius: 10,
    marginVertical: 5,
  },
  taskText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: "#6200ea",
    fontSize: 16,
    fontWeight: "bold",
  },
});
