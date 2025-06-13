import Footer from "../Footer/Footer";
import Header from "../header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import "../layout/Layout.css"
import LoginModal from "../modalLogin/Modal_Login";
import { useState } from "react";
import { useAuth } from "../../services/authcontext/AuthContext";
import {jwtDecode} from "jwt-decode";

const Layout = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
  const payload = {
    email: credentials.email,
    password: credentials.password
  };

  try {
    const response = await fetch('https://localhost:7047/api/Auth/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });


    if (!response.ok) throw new Error("Sucedió un error inesperado");
    const result = await response.text();

    // localStorage.setItem("token", result);
    login(result); // 👈 actualiza el contexto

    const decoded = jwtDecode(result);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // 🔁 Redirecciona según el rol
    if (role === "SysAdmin") {
      navigate("/reserv");
    } else if (role === "Client") {
      navigate("/");
    }

    setShowLogin(false);
  } catch (err) {
    console.log(err.message);
  }

};



    return (
    <div className="layout_container">
      <header className="header_container">
        <Header onLoginClick={() => setShowLogin(true)} />
      </header>
      <main className="main_container">
        <Outlet/>
      </main>
      <footer className="footer_container_layout">
        <Footer/>
      </footer>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSubmit={handleLogin}
      />
    </div>
    )
}

export default Layout;