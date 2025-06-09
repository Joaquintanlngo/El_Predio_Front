import Footer from "../Footer/Footer";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import "../layout/Layout.css"

const Layout = () => {
    return (
    <div className="layout_container">
      <header className="header_container">
        <Header/>
      </header>
      <main className="main_container">
        <Outlet/>
      </main>
      <footer className="footer_container_layout">
        <Footer/>
      </footer>
    </div>
    )
}

export default Layout;