import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import ContactUs from "../../ContactArea/ContactUs/ContactUs";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";

function Routing(): JSX.Element {
    return (
        <>
			<Routes>
                {/* General pages  */}
                <Route path="/home" element={<Home />} />
                <Route path="/vacation/:id" element={<VacationDetails />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/deals" element={<VacationsList />} />

                {/* Auth pages */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* Admin pages */}
                <Route path="/add-vacation" element={<AddVacation />} />

                {/* Default page */}
                <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
        </>
    );
}

export default Routing;
