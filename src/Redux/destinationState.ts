export class DestinationState {
    destinationId: number;
}

export enum DestinationActionType{
    SetDestinationId = "SetDestinationId"
}

export interface DestinationAction {
    type: DestinationActionType;
    payload: number;
}

export function setDestinationId(id: number): DestinationAction {
    return { type: DestinationActionType.SetDestinationId, payload: id};
}

export function destinationReducer(currentState: DestinationState = new DestinationState(), action: DestinationAction): DestinationState {
    const newState = {...currentState};

    if( action.type === DestinationActionType.SetDestinationId ) {
        newState.destinationId = action.payload;
    }

    return newState;
}