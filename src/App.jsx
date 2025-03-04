import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EventoProvider } from "./contexts/EventoContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/SignupPage";

function App() {
  return (
      <Router>
        <AuthProvider>
            <EventoProvider>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/dashboard" element={<Dashboard />} />                        
                    </Routes>
            </EventoProvider>
        </AuthProvider>
      </Router>
    );
}

export default App;
