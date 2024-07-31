import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "@/app/utils/firebaseConfig";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(collection(db, "notas"), (snapshot) => {
        const userNotes = snapshot.docs
          .filter((doc) => doc.data().id_user === user.uid)
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        setNotes(userNotes);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addNote = async (note) => {
    if (user) {
      const newNote = {
        ...note,
        id_user: user.uid,
        backgroundColor: getRandomColor(), // Añade un color de fondo aleatorio
      };
      const docRef = await addDoc(collection(db, "notas"), newNote);
      setNotes((prevNotes) => [
        ...prevNotes.filter((n) => n.id !== docRef.id), // Elimina cualquier duplicado
        { id: docRef.id, ...newNote },
      ]);
    }
  };

  const updateNote = async (updatedNote) => {
    if (user && updatedNote.id) {
      const noteRef = doc(db, "notas", updatedNote.id);
      await updateDoc(noteRef, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        )
      );
    }
  };

  const deleteNote = async (id) => {
    if (user) {
      const noteRef = doc(db, "notas", id);
      await deleteDoc(noteRef);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  return useContext(NotesContext);
};
