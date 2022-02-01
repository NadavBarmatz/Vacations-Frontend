import "./LikeAndCart.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function LikeAndCart(): JSX.Element {
    return (
        <div className="LikeAndCart">
            
            <FavoriteBorderIcon />

            <AddShoppingCartIcon />
            		
        </div>
    );
}

export default LikeAndCart;
