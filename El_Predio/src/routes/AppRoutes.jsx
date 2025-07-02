import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Booking from "../pages/booking/Booking";
import Booking_History from "../pages/booking_history/Booking_History";
import Available_Times from "../components/available_times/Available_Times";
import Protected from "../services/protected/Protected";
import ReservationConfirm from "../components/reservationConfirm/Reservation_Confirm";
import LoginPage from "../pages/login_Page/LoginPage";
import RegisterPage from "../pages/register_Page/RegisterPage";
import Home_Page from "../pages/home_page/Home_Page";
import Field_Finder_Page from "../pages/Field_Finder_Page/Field_Finder_Page";
import ConfirmReservation from "../components/confirmReservation/ConfirmReservation";

export default function AppRoutes () {
    return (
        
        <Routes>
            
            <Route path="/" element={<Layout />}>
                {/* <Route path="booking" element={<Booking />} /> */}
                <Route path="/reserv" element={
                    <Protected roles={["SysAdmin"]}>
                        <Booking_History />
                    </Protected>
                } />
                {/* <Route path="/pay" element={<ReservationConfirm/>} /> */}
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route index element={<Home_Page/>} />
                <Route path="/field" element={<Field_Finder_Page/>} />
                <Route path="/confirm" element={<ConfirmReservation/>} />
            </Route>

        </Routes>

    )
} 