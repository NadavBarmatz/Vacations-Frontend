import "./LikeAndCart.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from "react";
import likesService from "../../../Services/LikesService";
import { userLikesStore } from "../../../Redux/Store";
import LikeModel from "../../../Models/LikeModel";
import { getAllUserLikes } from "../../../Redux/UserLikesState";
import { Unsubscribe } from "redux";
import authService from "../../../Services/AuthService";

interface LikeAndCartProps {
    vacationId: number;
}

function LikeAndCart(props: LikeAndCartProps): JSX.Element {
    
    const [isLiked, setIsLiked] = useState<boolean>(false);

    let unSub: Unsubscribe;

    useEffect(( async () => {
        if(authService.isLoggedIn()){
            
            let userLikesArr: LikeModel[];
            unSub = userLikesStore.subscribe(() => {
                userLikesArr = userLikesStore.getState().userLikes;
            })

            if(!userLikesArr) {
                userLikesArr = await likesService.getUserLikes();
                userLikesStore.dispatch(getAllUserLikes(userLikesArr));
            }

            const isCurrentLike = userLikesArr.find(l => l.vacationId === props.vacationId);
            if(isCurrentLike) setIsLiked(true);

            return() => {
                if(authService.isLoggedIn()){
                    unSub();
                }
            }
        }
    }) as any, [])

    // useEffect(() => {
    //     if(authService.isLoggedIn()){
    //         unSub = userLikesStore.subscribe(()=>{
    //             const userLikesArr = userLikesStore.getState().userLikes;
    //             setUserLikes(userLikesArr);
    //         })
    //         const isCurrentLike = userLikes.find(l => l.vacationId === props.vacationId);
    //         if(isCurrentLike) {
    //             setIsLiked(true);
    //         }
    //     }

    //     return() => {
    //     if(authService.isLoggedIn()){
    //         unSub();
    //     }}
    // }, [userLikes]);

    
    const likeIt = async () => {
        try {
            // const userToken = localStorage.getItem("token");
            const like = await likesService.likeVacation(props.vacationId);
            setIsLiked(!isLiked);
        }
        catch(err: any) {
            alert(err.message);
        }      
    }

    const dislike = async () => {
        try{
            await likesService.dislikeVacation(props.vacationId);
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
