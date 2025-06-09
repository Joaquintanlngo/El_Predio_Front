import { Route, Routes } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Booking from "../pages/booking/booking";

export default function AppRoutes () {
    return (
        
        <Routes>

            <Route path="/" element={<Layout />}>
                <Route index element={<Booking />} />
            </Route>

        </Routes>

    )
} 