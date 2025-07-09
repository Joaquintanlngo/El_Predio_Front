import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../services/authcontext/AuthContext";

const RegisterPage = () => {

  const navigate = useNavigate()
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [visible, setVisible] = useState(false);

  const HandleCreate = async (name, lastName, email, password, phoneNumber) => {
    try {
      const response = await axios.post("https://localhost:7047/api/Auth/CreateUser", {
        fullName: `${name} ${lastName}`.trim(),
        email: email,
        password: password,
        phoneNumber: phoneNumber,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      handleLogin(response.data.email, response.data.password)
      navigate("/");
    } catch (error) {
      console.error("Error al crear usuario:", error.response?.data || error.message);
    }
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://localhost:7047/api/Auth/Login", {
        email,
        password,
      });
      
      const token = response.data;

      login(token);
      
    } catch (err) {
      console.error(err);
      setError("Email o contraseña incorrectos.");
    }
  };

  return (
    <div className="px-40 flex flex-1 justify-center py-2">
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
        <h2 className="text-[#0e151b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Crea tu cuenta
        </h2>

        {/* First and Last Name */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Nombre</p>
            <input
              placeholder="Liam"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
              defaultValue=""
              onChange={(e) => { setName(e.target.value) }}
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Apellido</p>
            <input
              placeholder="Harper"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
              defaultValue=""
              onChange={(e) => { setLastName(e.target.value) }}
            />
          </label>
        </div>

        {/* Email */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Email</p>
            <input
              placeholder="liam.harper@email.com"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
              defaultValue=""
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </label>
        </div>

        {/* Phone */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Telefono</p>
            <input
              placeholder="(341) 123-4567"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
              defaultValue=""
              onChange={(e) => { setPhoneNumber(e.target.value) }}
            />
          </label>
        </div>

        {/* Password */}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Contraseña</p>
            <div className="flex w-full flex-1 items-stretch rounded-xl">
              <input
                placeholder="••••••••"
                type={visible ? "text" : "password"}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                defaultValue=""
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <div className="text-[#4e7997] flex border-none bg-[#e7eef3] items-center justify-center pr-4 rounded-r-xl border-l-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256" onClick={() => {setVisible(!visible)}}>
                  <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                </svg>
              </div>
            </div>
          </label>
        </div>

        {/* Button */}
        <div className="flex px-4 py-3">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#1990e5] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]" onClick={() => {HandleCreate(name, lastName, email, password, phoneNumber)}}>
            <span className="truncate">Crear cuenta</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-[#4e7997] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline flex justify-center">
          <p className="max-w-[220px] cursor-pointer" onClick={() => { navigate("/login") }}>
            Ya tienes una cuenta? Iniciar sesión
          </p>
        </div>

      </div>
    </div>

  );
}

export default RegisterPage;