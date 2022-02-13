import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import LikesChart from "../../ChartsArea/LikesChart/LikesChart";
import ContactUs from "../../ContactArea/ContactUs/ContactUs";
import Home from "../../HomeArea/Home/Home";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import VacationsByDestination from "../../VacationsArea/VacationsByDestination/VacationsByDestination";
import VacationsList from "../../VacationsArea/VacationsList/VacationsList";

function Routing(): JSX.Element {
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
                <Route path="/add-vacation" element={<AddVacation />} />
                <Route path="/update-vacation/:id" element={<UpdateVacation />} />
                <Route path="/charts" element={<LikesChart />} />

                {/* Default page */}
                <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
        </>
    );
}

export default Routing;
