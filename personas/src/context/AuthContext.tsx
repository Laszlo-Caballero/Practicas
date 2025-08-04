"use client";
import { env } from "../app/config/env";
import { UserReponse } from "../app/interfaces/auth.interface";
import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AuthContextType = {
  user: UserReponse | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserReponse | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userLocal = localStorage.getItem("user");
    if (!userLocal) return;

    const userData: UserReponse = JSON.parse(userLocal);
    Cookie.set("auth_token", userData.token);
    setUser(userData);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`${env.url_api}/auth/login`, {
        correo: email,
        contrasena: password,
      });

      const userData: { usuario: UserReponse } = response.data;

      setUser(userData.usuario);
      Cookie.set("auth_token", userData.usuario.token);
      localStorage.setItem("user", JSON.stringify(userData.usuario));
      toast.success("Inicio de sesión exitoso");
      router.push("/");
    } catch (error) {
      Cookie.remove("auth_token");
      localStorage.removeItem("user");
      toast.error(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookie.remove("auth_token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
