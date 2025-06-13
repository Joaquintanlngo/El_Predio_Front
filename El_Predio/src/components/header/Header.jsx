import "../header/header.css"
import portada from "../../utils/images/portada.jpeg"

const Header = ({ isAuthenticated, onLoginClick, onLogoutClick }) => {

   return (
    <div className="cointainer-header">
      <div className="container-principal">
        <img src={portada} alt="" />
        <p>El Predio</p>
      </div>
      <div className="container-login">
        {isAuthenticated
          ? <button onClick={onLogoutClick}>Cerrar Sesión</button>
          : <button onClick={onLoginClick}>Iniciar Sesión</button>
        }
      </div>
    </div>
  );
}

export default Header;