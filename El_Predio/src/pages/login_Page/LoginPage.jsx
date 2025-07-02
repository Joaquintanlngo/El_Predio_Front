import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate()

    return (
        <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            <h2 className="text-[#0e151b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Bienvenido a El Predio
            </h2>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Email</p>
                <input
                  placeholder="Email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                  defaultValue=""
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Contraseña</p>
                <input
                  placeholder="Contraseña"
                  type="password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e151b] focus:outline-0 focus:ring-0 border-none bg-[#e7eef3] focus:border-none h-14 placeholder:text-[#4e7997] p-4 text-base font-normal leading-normal"
                  defaultValue=""
                />
              </label>
            </div>

            <div className="text-[#4e7997] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">
              <p className="max-w-[200px] cursor-pointer">
                Has olvidado tu contraseña?
              </p>
            </div>

            <div className="flex px-4 py-3">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#1990e5] text-slate-50 text-base font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Iniciar sesión</span>
              </button>
            </div>

            <div className="text-[#4e7997] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">

              <a  className="max-w-[200px] cursor-pointer" onClick={() => {navigate("/register")}}>
                No tienes una cuenta? Registrate
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default LoginPage;