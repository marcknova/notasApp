import { createContext, useContext, useState, useEffect } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/utils/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      let errorMessage = "Error desconocido";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico es inválido.";
          break;
        case "auth/user-not-found":
          errorMessage =
            "No se encontró una cuenta con este correo electrónico.";
          break;
        case "auth/wrong-password":
          errorMessage = "La contraseña es incorrecta.";
          break;
        case "auth/network-request-failed":
          errorMessage =
            "Error de red. Por favor, revisa tu conexión a Internet.";
          break;
        default:
          errorMessage =
            "Error al iniciar sesión. Por favor, intenta de nuevo.";
      }
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    return auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
