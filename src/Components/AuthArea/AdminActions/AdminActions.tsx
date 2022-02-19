import { MenuItem, Select } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./AdminActions.css";

function AdminActions(): JSX.Element {
    return (
        <div className="AdminActions">
			<Select defaultValue={0}>
                <MenuItem value={0}>
                    Admin Actions
                </MenuItem>
                <MenuItem value={1}>
                    <NavLink to="add-vacation">Add Vacation</NavLink>
                </MenuItem>
                <MenuItem value={2}>
                    <NavLink to="/charts">CHARTS</NavLink>
                </MenuItem>
            </Select>
        </div>
    );
}

export default AdminActions;
