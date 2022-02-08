import "./LikeAndCart.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react";
import likesService from "../../../Services/LikesService";
import { userLikesStore, vacationsStore } from "../../../Redux/Store";
import { getAllUserLikes } from "../../../Redux/UserLikesState";
import { Unsubscribe } from "redux";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationsService";
import { updateVacationAction } from "../../../Redux/VacationsState";

interface LikeAndCartProps {
    vacationId: number;
}

function LikeAndCart(props: LikeAndCartProps): JSX.Element {
    
    const [isLiked, setIsLiked] = useState<boolean>(false);

    let unSub: Unsubscribe;

    useEffect(( async () => {
        if(authService.isLoggedIn()){
            
            let userLikesArr = await likesService.getUserLikes();
            userLikesStore.dispatch(getAllUserLikes(userLikesArr));

            unSub = userLikesStore.subscribe(async () => {
                userLikesArr =  userLikesStore.getState().userLikes //await likesService.getUserLikes();
                const isCurrentLike = userLikesArr.find(l => l.vacationId === props.vacationId);
                if(isCurrentLike) setIsLiked(!isLiked);
                else if(!isCurrentLike) setIsLiked(false);

            })

            return() => {
                if(authService.isLoggedIn()){
                    unSub();
                }
            }
        }
    }) as any, [])

    const likeIt = async () => {
        try {
            await likesService.likeVacation(props.vacationId);
            const vacation = await vacationsService.getOneVacation(props.vacationId);
            vacationsStore.dispatch(updateVacationAction(vacation));
            setIsLiked(!isLiked);
        }
        catch(err: any) {
            alert(err.message);
        }      
    }

    const dislike = async () => {
        try{
            await likesService.dislikeVacation(props.vacationId);
            const vacation = await vacationsService.getOneVacation(props.vacationId);
            vacationsStore.dispatch(updateVacationAction(vacation));
            setIsLiked(!isLiked);
        }
        catch(err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="LikeAndCart">
            
            {isLiked ? <FavoriteIcon onClick={dislike} /> : <FavoriteBorderIcon onClick={likeIt} />}

            <AddShoppingCartIcon />
            		
        </div>
    );
}

export default LikeAndCart;
