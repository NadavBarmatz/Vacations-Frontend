import "./MorePlacesToGo.css";
import ResponsiveNameCarousel from "./ResponsiveNameCarousel/ResponsiveNameCarousel";

interface MorePlacesToGoProps {
	
}

function MorePlacesToGo(props: MorePlacesToGoProps): JSX.Element {
    return (
        <div className="MorePlacesToGo">
            <h2>MORE PLACES TO GO</h2>
            <ResponsiveNameCarousel />
        </div>
    );
}

export default MorePlacesToGo;
