import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import Register from "../../AuthArea/Register/Register";
import ContactUs from "../../ContactArea/ContactUs/ContactUs";
import Home from "../../HomeArea/Home/Home";

function Routing(): JSX.Element {
    return (
        <>
			<Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/contact" element={<ContactUs />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
        </>
    );
}

export default Routing;
