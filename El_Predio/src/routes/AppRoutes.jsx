import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Booking from "../pages/booking/booking";
import Booking_History from "../pages/booking_history/Booking_History";

export default function AppRoutes () {
    return (
        
        <Routes>

            <Route path="/" element={<Layout />}>
                <Route index element={<Booking />} />
                <Route path="/reserv" element={<Booking_History />} />
            </Route>

        </Routes>

    )
} 