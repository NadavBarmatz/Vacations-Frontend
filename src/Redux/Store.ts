import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { userLikesReducer } from "./UserLikesState";
import { vacationsReducer } from "./VacationsState";

export const authStore = createStore(authReducer);
export const vacationsStore = createStore(vacationsReducer);
export const userLikesStore = createStore(userLikesReducer);