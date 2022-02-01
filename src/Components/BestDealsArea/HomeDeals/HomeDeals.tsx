import ResponsiveCarousel from "../ResponsiveCarousel/ResponsiveCarousel";
import "./HomeDeals.css";

function HomeDeals(): JSX.Element {

    return (
        <div className="HomeDeals">
            <h2>BEST DEALS</h2>	
            <ResponsiveCarousel />
        </div>
    );
}

export default HomeDeals;
