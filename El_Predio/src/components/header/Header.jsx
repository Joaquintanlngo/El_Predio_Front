import "../header/header.css"
import portada from "../../utils/images/portada.jpeg"
import { useAuth } from "../../services/authcontext/AuthContext";

const Header = ({ onLoginClick }) => {
    const { isAuthenticated, logout } = useAuth();

   return (
    <div className="cointainer-header">
      <div className="container-principal">
        <img src={portada} alt="" />
        <p>El Predio</p>
      </div>
      <div className="container-login">
        {isAuthenticated
          ? <button onClick={logout}>Cerrar Sesión</button>
          : <button onClick={onLoginClick}>Iniciar Sesión</button>
        }
      </div>
    </div>
  );
}

export default Header;