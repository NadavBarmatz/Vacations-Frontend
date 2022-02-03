import VacationModel from "../Models/VacationModel";


export class VacationsState{
    public vacations: VacationModel[];
}

export enum VacationsActionType {
    GetVacations = "GetVacations",
    AddVacation = "AddVacation",
    UpdateVacation = "UpdateVacation",
    DeleteVacation = "DeleteVacation"
}

export interface VacationsAction {
    type: VacationsActionType;
    payload: any;
}

export function getVacationsAction(vacations: VacationModel[]): VacationsAction {
    return { type: VacationsActionType.GetVacations, payload: vacations };
}

export function addVacationAction(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.AddVacation, payload: vacation };
}

export function updateVacationAction(vacation: VacationModel): VacationsAction {
    return { type: VacationsActionType.UpdateVacation, payload: vacation };
}

export function deleteVacationAction(idToDelete: number): VacationsAction {
    return { type: VacationsActionType.DeleteVacation, payload: idToDelete };
}

export function vacationsReducer(currentVacationsState: VacationsState = new VacationsState(), action: VacationsAction): VacationsState {
    const newVacationsState = {...currentVacationsState};

    switch (action.type) {

        case VacationsActionType.GetVacations:
            newVacationsState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation:
            newVacationsState.vacations.push(action.payload);
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate = newVacationsState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            newVacationsState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.DeleteVacation:
            const indexToDelete = newVacationsState.vacations.findIndex(v => v.vacationId === action.payload);
            newVacationsState.vacations.splice(indexToDelete, 1);
            break;

    }

    return newVacationsState;
}



