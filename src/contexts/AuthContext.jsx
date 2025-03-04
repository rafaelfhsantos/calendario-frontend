import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get("http://localhost:5000/me") // Endpoint para buscar os dados do usuário
                .then(response => setUser(response.data))
                .catch(() => logout());
        }
        setLoading(false);
    }, []);

    const signup = async (name, email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/users", {name, email, password});            
            login(email, password);
        } catch (error){            
            if (error.response.data.message == 'User already exists'){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'O email '+email+' já possui um cadastro!',
                })
            }
            return("Não foi possível realizar o cadastro");
        }

    }



    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/session", { email, password });
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao fazer login", error);
            return("Credenciais Inválidas");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = "";
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, signup }}>
            {children}
        </AuthContext.Provider>
    );
}
