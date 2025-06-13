import Footer from "../Footer/Footer";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import "../layout/Layout.css"
import LoginModal from "../modalLogin/Modal_Login";
import { useState } from "react";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);

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
    localStorage.setItem("token", result);
    setIsAuthenticated(true); // ⬅️ Actualiza el estado
    setShowLogin(false);
    console.log("Respuesta del servidor", result);

  } catch (err) {
    console.log(err.message);
  }

  setShowLogin(false);
};

const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // ⬅️ Actualiza el estado
  };


    return (
    <div className="layout_container">
      <header className="header_container">
        <Header 
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setShowLogin(true)}
          onLogoutClick={handleLogout}/>
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