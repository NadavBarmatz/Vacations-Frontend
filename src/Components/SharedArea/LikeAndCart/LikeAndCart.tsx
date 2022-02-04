import "./LikeAndCart.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";
import likesService from "../../../Services/LikesService";

interface LikeAndCartProps {
    vacationId: number;
}

function LikeAndCart(props: LikeAndCartProps): JSX.Element {

    const [isLiked, setIsLiked] = useState<boolean>(false);
    
    const likeIt = async () => {
        try {
            // const userToken = localStorage.getItem("token");
            const like = await likesService.likeVacation(props.vacationId);
            alert("like: " + like);
            setIsLiked(!isLiked);
        }
        catch(err: any) {
            alert(err.message);
        }      
    }

    const dislike = async () => {
        try{
            await likesService.dislikeVacation(props.vacationId);
            alert("dislike")
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
