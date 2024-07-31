import { useNotes } from "@/context/NoteContext";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import NoteAddModal from "../components/Notes/NoteAddModal";
import NoteEditModal from "../components/Notes/NoteEditModal";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { notes, deleteNote } = useNotes();

  const openEditModal = (note) => {
    setSelectedNote(note);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedNote(null);
    setIsEditModalOpen(false);
  };

  const handleDelete = (noteId) => {
    deleteNote(noteId);
  };

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  return (
    <ScrollView>
      <View>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Notas",
            headerRight: () => (
              <Button
                labelStyle={{ fontSize: 16, color: "#000000" }}
                onPress={openAddModal}
              >
                Agregar
              </Button>
            ),
          }}
        />
        {notes.map((data, index) => (
          <View
            style={[
              styles.cardContent,
              { backgroundColor: data.backgroundColor },
            ]}
            key={index}
          >
            <Text style={styles.title}>{data.titulo}</Text>
            <Text style={{ marginVertical: 5 }}>{data.descripcion}</Text>
            <View style={{ width: "100%", marginTop: 10 }}>
              <Button
                style={styles.editButton}
                labelStyle={{ color: "#000000", fontWeight: "700" }}
                onPress={() => {
                  openEditModal(data);
                }}
              >
                Editar
              </Button>
              <Button
                labelStyle={{ color: "#000000" }}
                onPress={() => handleDelete(data.id)}
              >
                Eliminar
              </Button>
            </View>
          </View>
        ))}
        <NoteAddModal isVisible={isAddModalOpen} onClose={closeAddModal} />
        <NoteEditModal
          isVisible={isEditModalOpen}
          onClose={closeEditModal}
          note={selectedNote}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    width: "90%",
    marginHorizontal: "auto",
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-evenly",
    shadowColor: "#000",
    marginVertical: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
});
