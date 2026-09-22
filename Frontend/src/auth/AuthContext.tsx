import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import axios from "axios";
import api from "../api/axios";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;

  /*
   * Opcional por ahora.
   *
   * Cuando implementemos perfiles,
   * Laravel enviará la URL de la
   * imagen del usuario.
   */
  avatar_url?: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;

  checkAuth: () => Promise<void>;

  login: (email: string, password: string, remember: boolean) => Promise<User>;

  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await api.get<User>("/api/user");
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    email: string,
    password: string,
    remember: boolean,
  ): Promise<User> => {
    await api.get("/sanctum/csrf-cookie");

    const response = await api.post<{
      message: string;
      user: User;
    }>("/login", {
      email,
      password,
      remember,
    });

    setUser(response.data.user);

    return response.data.user;
  };

  const logout = async () => {
    /*
     * El logout debe confirmarse en Laravel antes de borrar el usuario
     * del estado de React. De esta manera no mostramos una sesión como
     * cerrada si el servidor no pudo invalidarla.
     *
     * Si el token CSRF expiró (419), obtenemos uno nuevo y reintentamos
     * exactamente una vez.
     */
    try {
      await api.post("/logout");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 419) {
        await api.get("/sanctum/csrf-cookie");
        await api.post("/logout");
      } else {
        throw error;
      }
    }

    setUser(null);
  };

  useEffect(() => {
    void checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        checkAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider");
  }

  return context;
}
