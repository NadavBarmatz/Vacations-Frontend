import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Unsubscribe } from "redux";
import Role from "../../../Models/Role";
import { authStore } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import LikesChart from "../../ChartsArea/LikesChart/LikesChart";
import ContactUs from "../../ContactArea/ContactUs/ContactUs";
import Home from "../../HomeArea/Home/Home";
import MustBeAdmin from "../../SharedArea/MustBeAdmin/MustBeAdmin";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import VacationsByDestination from "../../VacationsArea/VacationsByDestination/VacationsByDestination";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Page404 from "../Page404/Page404";

function Routing(): JSX.Element {

    const [userRole, setUserRole] = useState<Role>(authStore.getState().user?.role);

    useEffect(()=>{
        const unsubscribe: Unsubscribe = authStore.subscribe(()=>{
            setUserRole(authStore.getState().user?.role)
        })
        return()=>{unsubscribe()}   
    }, [])

    return (
        <>
			<Routes>
                {/* General pages  */}
                <Route path="/home" element={<Home />} />


                <Route path="/vacation/:id" element={<VacationDetails />} />
                <Route path="/vacations/list-by-destination/:id" element={<VacationsByDestination />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/deals" element={<VacationsList />} />

                {/* Auth pages */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* Admin pages */}
                <Route path="/add-vacation" element={ userRole === Role.Admin ? <AddVacation /> : (authService.isLoggedIn() ? <MustBeAdmin /> : <Navigate to="/login" />) } />
                <Route path="/update-vacation/:id" element={ userRole === Role.Admin ? <UpdateVacation /> : (authService.isLoggedIn() ? <MustBeAdmin /> : <Navigate to="/login" />) } />
                <Route path="/charts" element={ userRole === Role.Admin ? <LikesChart /> : (authService.isLoggedIn() ? <MustBeAdmin /> : <Navigate to="/login" />) } />

                {/* Default page */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found route */}
                <Route path="*" element={<Page404 />} />
            </Routes>
        </>
    );
}

export default Routing;
