import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { destinationReducer } from "./destinationState";
import { mobileBurgerReducer } from "./MobileBurgerState";
import { userLikesReducer } from "./UserLikesState";
import { vacationsReducer } from "./VacationsState";

export const authStore = createStore(authReducer);
export const vacationsStore = createStore(vacationsReducer);
export const userLikesStore = createStore(userLikesReducer);
export const mobileBurgerStore = createStore(mobileBurgerReducer);

export const destinationStore = createStore(destinationReducer);