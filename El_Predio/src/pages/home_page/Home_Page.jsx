import { useNavigate } from "react-router-dom";


const Home_Page = () => {

  const navigate = useNavigate()

    return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden max-w-[1200px] m-auto flex justify-center"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* HERO SECTION */}
        <section className="px-40 py-10 flex justify-center">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-4" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCL_P5nN761DlXc_SJhj4arJcWTrk6q8SLCywGNOLmGnsxBXJ6HqnUZQwS5_Vqbjnx3HKZ1Zc5BnSAFU79sVe7GVgiYNUanTexn-7hXYu6uQt6vCjeY0wy0Q3cueiccGqKkvNWokI2sJ-pp6cjd_FFWzOcHXOPGNXdZqXBppxPfKoelNxDIJEa7EPCM2f0Eizgi5sqixQDPv4Q6THL61ckPFJuUUjdZdX4s-3c_9e8sobvHXbYPZNegLRWutV8AUT6ayw8fe6CjSITq')` }}>
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-white text-4xl font-black leading-tight @[480px]:text-5xl">Encuentra y reserva canchas de fútbol</h1>
                <h2 className="text-white text-sm @[480px]:text-base">
                  Descubre y reserva canchas de fútbol fácilmente con FieldFinder. Ya sea que estés planeando un partido amistoso o un entrenamiento, te tenemos cubierto.
                </h2>
              </div>
              <button onClick={() => {navigate("field")}} className="flex items-center justify-center rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1990e5] text-slate-50 text-sm @[480px]:text-base font-bold tracking-[0.015em]">
                <span className="truncate">Reservar Cancha</span>
              </button>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#0e151b] text-[32px] font-bold max-w-[720px]">Como trabajamos</h1>
            <p className="text-[#0e151b] text-base font-normal max-w-[720px]">
              FieldFinder simplifica el proceso de búsqueda y reserva de campos de fútbol, ​​garantizando que pases menos tiempo planificando y más tiempo jugando.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" /></svg>
                ),
                title: "Buscar canchas",
                description: "Utilice nuestra búsqueda intuitiva para encontrar campos según la ubicación, la disponibilidad y las comodidades."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z" /></svg>
                ),
                title: "Seleccione su fecha y hora",
                description: "Elige el horario perfecto para tu partido o sesión de práctica."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z" /></svg>
                ),
                title: "Confirma tu reserva",
                description: "Revise los detalles de su reserva y finalice su reserva con facilidad."
              }
            ].map(({ icon, title, description }, i) => (
              <div key={i} className="flex flex-col gap-3 border border-[#d0dde7] bg-slate-50 p-4 rounded-lg">
                <div className="text-[#0e151b]">{icon}</div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#0e151b] text-base font-bold leading-tight">{title}</h2>
                  <p className="text-[#4e7997] text-sm font-normal leading-normal">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE FIELDFINDER */}
        <section className="flex flex-col gap-10 px-4 py-10 @container">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#0e151b] text-[32px] font-bold max-w-[720px]">¿Por qué elegir FieldFinder?</h1>
            <p className="text-[#0e151b] text-base font-normal max-w-[720px]">
              FieldFinder ofrece una plataforma perfecta y confiable para todas sus necesidades de reserva de campos de fútbol, ​​lo que garantiza una experiencia sin complicaciones.
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
                {[
                  {
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4Mo5fXIk-YcmMmtcSwK9UlcjFkY9gmmG26bEsdOUPRscGUw6gV8rEAFJ-8YwUM8OSQ0KFMpNrjH2et_IwayyCI5zbfY_9U3ZE5xFteXLvVF7jciXvmzcJoN_h7ab0sVryEtZuEVeDtnOGCHZGYnKPf_OqKVur7pDTKkpMcdMkVqr30LxCR06Jj_3GgK2bYNSuCZIrYnEIlbeZpaqifIaqYuDQFPkagnFFRISrZlwqoY9afNjGMBxSDZfXe0BNOkfcepvzGouGeOpV",
                    title: "Amplia selección de canchas",
                    description:
                      "Acceda a una amplia variedad de campos de fútbol, ​​desde parques locales hasta instalaciones de nivel profesional."
                  },
                  {
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuARfmdc9uugBvQmh9f22mSS48rHwZBtqar9ieCDnesYHXK1S7b3xy3OcHMdTog_xWmCCzy1taul_CI2L8sOKI9W_p-1BPyJmw9eKjzZeilV0ursfYu8Ku7ROQUpLVsCbxB3tF3_Id4n9ceHum8nQFi5xNEL2E2PYKB1gaWwX8sZYFfVbHIC8zbfQCed_SgkPY1YxSYnOSIrbsamjcVsFrRHOYFyhADbhJe9P7a2uRtyflBLvMn6BkdU7p3emy3bstI8XXYXx3F7j9pe",
                    title: "Proceso de reserva sencillo",
                    description:
                      "Nuestra interfaz fácil de usar hace que la reserva sea rápida y sencilla."
                  },
                  {
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALj7hKt6A95xhFKBOpEdGWxC0jVOkXf0yJPbHCZhHA0jsrNK-E76O8hFjk3W_KMC-TlUf93loq72CWon7FDxrJVPaib8sflzl2mAdO2buS21I1fbHnk0n4HIOLtcLWaalqytP-PXyaixddt9cPuyL1IJCVdbKEMbiV5fW6StWImjL1QKfDd_z42A7IiPxQsI8PMWZLsY_2Z6Sc5Q0f407ykUabWYMo0wTy5QtNAQ6_HaK0KDSyjXctf1LrkPKmO8ux0J10Iovr1Rdn",
                    title: "Segura y confiable",
                    description:
                      "Disfrute de la tranquilidad con nuestro sistema de pago seguro y confirmaciones de reserva confiables."
                  }
                ].map(({ image, title, description }, index) => (
                  <div key={index} className="flex flex-col gap-3 pb-3">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                      style={{ backgroundImage: `url('${image}')` }}
                    ></div>
                    <div>
                      <p className="text-[#0e151b] text-base font-medium leading-normal">{title}</p>
                      <p className="text-[#4e7997] text-sm font-normal leading-normal">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
        </section>

        
      </div>
    </div>
  );
}

export default Home_Page;