import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Booking from "../pages/booking/booking";
import Booking_History from "../pages/booking_history/Booking_History";
import Available_Times from "../components/available_times/Available_Times";
import Protected from "../services/protected/Protected";

export default function AppRoutes () {
    return (
        
        <Routes>

            <Route path="/" element={<Layout />}>
                <Route index element={<Booking />} />
                <Route path="/reserv" element={
                    <Protected roles={["SysAdmin"]}>
                        <Booking_History />
                    </Protected>
                } />
                <Route path="/times" element={<Available_Times />} />
            </Route>

        </Routes>

    )
} 