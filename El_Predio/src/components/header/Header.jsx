import "../header/header.css"
import portada from "../../utils/images/portada.jpeg"
import { useAuth } from "../../services/authcontext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = ({ onLoginClick }) => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate()

    // const [isToken, setIsToken] = useState(localStorage.getItem("token"))

    // useEffect(() => {
    //   setIsToken(localStorage.getItem("token"))
    // },[localStorage.getItem("token")])

   return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eef3] px-10 py-3">
          <div className="flex items-center gap-4 text-[#0e151b]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-[#0e151b] text-lg font-bold leading-tight tracking-[-0.015em]" onClick={() => {navigate("/")}}>FieldFinder</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#0e151b] text-sm font-medium leading-normal" href="#" onClick={() => {navigate("/")}}>
                Inicio
              </a>
              <a className="text-[#0e151b] text-sm font-medium leading-normal" href="#" onClick={() => {navigate("/field")}}>
                Canchas
              </a>
              <a className="text-[#0e151b] text-sm font-medium leading-normal" href="#">
                Sobre nos
              </a>
              <a className="text-[#0e151b] text-sm font-medium leading-normal" href="#">
                Contacto
              </a>
            </div>
            {!isAuthenticated ? <div className="flex gap-2">
              <button  onClick={() => {navigate("/login")}} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1990e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Iniciar sesión</span>
              </button>
              <button onClick={() => {navigate("/register")}} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e7eef3] text-[#0e151b] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate" >Registrarse</span>
              </button>
            </div>
            : <button  onClick={() => {logout()}} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1990e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Cerrar sesión</span>
              </button>
            }
          </div>
        </header>
  );
}

export default Header;