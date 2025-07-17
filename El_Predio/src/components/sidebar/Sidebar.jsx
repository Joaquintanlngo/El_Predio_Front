import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/authcontext/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const [role, setRole] = useState(null);

    useEffect(() => {
        if (isAuthenticated) {
            const token = localStorage.getItem("token");
            if (token) {
                const decoded = jwtDecode(token);
                const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
                setRole(decoded[roleClaim]);
            }
        }
    }, [isAuthenticated])


    useEffect(() => {
        if (isOpen) {
            setVisible(true); // Montamos el componente
        }
    }, [isOpen]);

    const handleNavigate = (route) => {
        navigate(`/${route}`);
        handleClose();
    }

    const handleClose = () => {
        setVisible(false);
        onClose(); // Ocultamos el componente en Layout luego de la animación

    };

    if (!isOpen && !visible) return null; // No renderiza si ya está oculto

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Fondo oscuro */}
            <div
                className="absolute inset-0 bg-black/40 transition-opacity duration-300"
                onClick={handleClose}
            />

            {/* Sidebar animado */}
            <div
                className={`relative z-50 w-64 h-[100%] bg-[#0e151b] text-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen && visible ? "translate-x-0" : "translate-x-full"}
        `}
            >
                <div className="p-4 flex justify-between items-center border-b border-white/10">
                    <span className="text-xl font-semibold">Menú</span>
                    <button onClick={handleClose} className="text-white text-xl">✕</button>
                </div>
                {role === "Client"
                    ? <nav className="flex flex-col justify-between h-full p-4 pb-24">
                        <div className="flex flex-col gap-3">
                            <a href="#" className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg" onClick={() => { handleNavigate("myprofile") }}>Mi perfil</a>
                            <a href="#" className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg" onClick={() => { handleNavigate("myReservation") }}>Mis Reservas</a>
                            <a href="#" className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg" onClick={() => { handleNavigate("field") }}>Reservar</a>
                            <a href="#" className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg">Soporte</a>
                        </div>
                        <a className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg text-red-300 cursor-pointer" onClick={() => { logout(), handleClose() }}>Cerrar sesión</a>
                    </nav>
                    : <nav className="flex flex-col justify-between h-full p-4 pb-24">
                        <div className="flex flex-col gap-3">
                            <a href="#" className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg" onClick={() => { handleNavigate("myprofile") }}>Mi perfil</a>
                            <a href="#" className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg" onClick={() => { handleNavigate("reserv") }}>Reservas</a>
                            <a href="#" className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg">Canchas Admin</a>
                            <a href="#" className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg">Usuarios Admin</a>
                        </div>
                        <a className="hover:bg-[#1e2a33] px-3 py-2 rounded-lg text-red-300 cursor-pointer" onClick={() => { logout(), handleClose() }}>Cerrar sesión</a>
                    </nav>}
            </div>
        </div>
    );
};

export default Sidebar;
