import "./Loading.css";
import loading from "../../../Assets/Images/Loading/loading2.gif"

function Loading(): JSX.Element {
    return (
        <div className="Loading">
			<img src={loading} />
        </div>
    );
}

export default Loading;
