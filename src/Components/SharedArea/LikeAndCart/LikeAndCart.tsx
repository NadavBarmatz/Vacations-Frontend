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
import notificationService from "../../../Services/NotificationService";

interface LikeAndCartProps {
    vacationId: number;
}

function LikeAndCart(props: LikeAndCartProps): JSX.Element {
    
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(( async () => {
        try{
            let unSub : Unsubscribe;

            if(authService.isLoggedIn()){

                let userLikesArr = await likesService.getUserLikes();
                const isVacationLiked = userLikesArr.find(v => v.vacationId === props.vacationId);
                if(isVacationLiked) setIsLiked(true);
                else if (!isVacationLiked) setIsLiked(false);

                unSub = userLikesStore.subscribe(() => {
                    let userLikesArr = userLikesStore.getState().userLikes;
                    const isVacationLiked = userLikesArr.find(v => v.vacationId === props.vacationId);
                    if(isVacationLiked) setIsLiked(!isLiked);
                    else if (!isVacationLiked) setIsLiked(false);
                })
                
                return () => {unSub()}

            }

        }
        catch(err: any) {
            notificationService.error(err);
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
            notificationService.error(err);
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
            notificationService.error(err);
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
