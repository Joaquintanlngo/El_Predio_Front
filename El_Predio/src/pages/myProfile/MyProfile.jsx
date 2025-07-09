import { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "../../utils/icons/icons"
import axios from "axios";
import { useAuth } from "../../services/authcontext/AuthContext";

const MyProfile = () => {
    const { token, logout } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState("");


    const fetchUser = async () => {
        try {
            const response = await axios.get("https://localhost:7047/api/Auth/GetUserById", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setUser(response.data);
            setLoading(true)

        } catch (err) {
            setError("Error al obtener el usuario");
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        
        if (user) {
            setFullName(user.fullName);
            setEmail(user.email);
            setPhone(user.phoneNumber);
        }
    }, [user]);

    const handleUpdate = async (fullName, email, phone) => {
        try {
            const response = await axios.put(
                "https://localhost:7047/api/Auth/UpdateUser",
                {
                    fullName,
                    email,
                    phoneNumber: phone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            await fetchUser();
            // setUser(response.data);
            setEdit(false);
        } catch (err) {
            setError("Error al obtener el usuario");
            console.error(err);
        }
    }

    const handleDelete = async () => {
         try {
            const response = await axios.delete("https://localhost:7047/api/Auth/DeleteUser", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            
            logout();
        } catch (err) {
            setError("Error al obtener el usuario");
            console.error(err);
        }
    }

    return (
        <div
            className="relative flex min-h-screen flex-col bg-slate-50 overflow-x-hidden"
            style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
        >
            <div className="flex h-full grow flex-col">

                {/* Main */}

                <main className="px-40 flex flex-1 justify-center py-5">
                    <div className="flex flex-col max-w-[960px] w-full">
                        <div className="flex flex-wrap justify-between gap-3 p-4">
                            <p className="text-[32px] font-bold tracking-light leading-tight text-[#0e151b] min-w-72">Mi perfil</p>
                        </div>

                        {loading
                            ? <>
                                <div className="flex p-4">
                                    <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                                        <div className="flex gap-4">
                                            <IoPersonCircleOutline className="h-[150px] w-[150px] text-gray-500" />
                                            <div className="flex flex-col justify-center">
                                                <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-[#0e151b]">
                                                    {user.fullName}
                                                </p>
                                                <p className="text-base font-normal text-[#4e7997]">{user.email}</p>
                                                <button className="flex min-w-[84px] items-center justify-center h-6 mt-2 rounded-full bg-red-700 text-white text-sm font-bold" onClick={() => {handleDelete()}}>
                                                    <span className="truncate">Eliminar cuenta</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                    <label className="flex flex-col min-w-40 flex-1">
                                        <p className="text-base font-medium leading-normal pb-2 text-[#0e151b]">Nombre y Apellido</p>
                                        <input
                                            className={`form-input flex w-full rounded-xl bg-slate-50 border border-[#d0dde7] h-14 p-[15px] text-base focus:outline-0 focus:ring-0 focus:border-[#d0dde7] placeholder:text-[#4e7997] ${edit ? "text-[#0e151b]" : "text-[#6b7280]"}`}
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            disabled={!edit}
                                        />
                                    </label>
                                </div>

                                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                    <label className="flex flex-col min-w-40 flex-1">
                                        <p className="text-base font-medium leading-normal pb-2 text-[#0e151b]">Email</p>
                                        <input
                                            className={`form-input flex w-full rounded-xl bg-slate-50 border border-[#d0dde7] h-14 p-[15px] text-base focus:outline-0 focus:ring-0 focus:border-[#d0dde7] placeholder:text-[#4e7997] ${edit ? "text-[#0e151b]" : "text-[#6b7280]"}`}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={!edit}
                                        />
                                    </label>
                                </div>

                                <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                                    <label className="flex flex-col min-w-40 flex-1">
                                        <p className="text-base font-medium leading-normal pb-2 text-[#0e151b]">Teléfono</p>
                                        <input
                                            className={`form-input flex w-full rounded-xl bg-slate-50 border border-[#d0dde7] h-14 p-[15px] text-base focus:outline-0 focus:ring-0 focus:border-[#d0dde7] placeholder:text-[#4e7997] ${edit ? "text-[#0e151b]" : "text-[#6b7280]"}`}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            disabled={!edit}
                                        />
                                    </label>
                                </div>
                            </>
                            : <div>Cargando...</div>
                        }


                        <div className="flex px-4 py-3 justify-end gap-2">
                            {edit
                                ?
                                <>
                                    <button className="flex min-w-[84px] items-center justify-center h-10 px-4 rounded-full bg-red-600 text-white text-sm font-bold" onClick={() => { setEdit(false), setFullName(user.fullName), setEmail(user.email), setPhone(user.phoneNumber) }}>
                                        <span className="truncate">Cancelar</span>
                                    </button>
                                    <button className="flex min-w-[84px] items-center justify-center h-10 px-4 rounded-full bg-[#1990e5] text-white text-sm font-bold" onClick={() => { handleUpdate(fullName, email, phone) }}>
                                        <span className="truncate">Guardar</span>
                                    </button>
                                </>
                                : <button className="flex min-w-[84px] items-center justify-center h-10 px-4 rounded-full bg-[#1990e5] text-white text-sm font-bold" onClick={() => { setEdit(true) }}>
                                    <span className="truncate">Editar</span>
                                </button>
                            }
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MyProfile;