import LikeModel from "../Models/LikeModel";

export class UserLikesState {
    public userLikes: LikeModel[];
}

export enum UserLikesActionType {
    Like = "Like",
    Dislike = "Dislike",
    GetAllUserLikes = "GetAllUserLikes"
}

export interface UserLikesAction {
    type: UserLikesActionType;
    payload: any;
}

export function likeAction(like: LikeModel): UserLikesAction {
    return {type: UserLikesActionType.Like, payload: like};
}

export function dislikeAction(dislike: LikeModel): UserLikesAction {
    return {type: UserLikesActionType.Dislike, payload: dislike};
}

export function getAllUserLikes(userLikes: LikeModel[]): UserLikesAction {
    return {type: UserLikesActionType.GetAllUserLikes, payload: userLikes};
}

export function userLikesReducer(currentUserLikesState: UserLikesState = new UserLikesState(), action: UserLikesAction): UserLikesState {
    const newUserLikesState = {... currentUserLikesState};

    switch(action.type) {
        case UserLikesActionType.GetAllUserLikes:
            newUserLikesState.userLikes = action.payload;
            break;

        case UserLikesActionType.Like:
            newUserLikesState.userLikes.push(action.payload);
            break;
        
        case UserLikesActionType.Dislike:
            const likeIndex = newUserLikesState.userLikes.findIndex(l => l.userId === action.payload.userId && l.vacationId === action.payload.vacationId);
            newUserLikesState.userLikes.splice(likeIndex, 1);
            break;
    }

    return newUserLikesState;
}