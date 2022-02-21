export class MobileBurgerState{
    public openMenu: boolean = false;
    public adminMenu: boolean = false;
}

export enum MobileBurgerActionTypes{
    ChangeMenuState = "ChangeMenuState",
    ChangeAdminMenuState = "ChangeAdminMenuState"
}

export interface MobileBurgerActions{
    type: MobileBurgerActionTypes;
    payload: any;
}

export function changeMenuState(burgerState: boolean): MobileBurgerActions{
    return { type: MobileBurgerActionTypes.ChangeMenuState, payload: !burgerState }
}

export function changeAdminMenuState(adminMenuState: boolean): MobileBurgerActions{
    return { type: MobileBurgerActionTypes.ChangeMenuState, payload: !adminMenuState }
}

export function mobileBurgerReducer(currentMobileState = new MobileBurgerState(), action: MobileBurgerActions): MobileBurgerState{
    const newMobileState = {...currentMobileState};

    switch (action.type){
        case MobileBurgerActionTypes.ChangeMenuState:
            newMobileState.openMenu = !currentMobileState.openMenu;
            break;

        case MobileBurgerActionTypes.ChangeAdminMenuState:
            newMobileState.adminMenu = action.payload;
            break;
    }

    return newMobileState;
}