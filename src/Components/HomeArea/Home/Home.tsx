import HomeDeals from "../../BestDealsArea/HomeDeals/HomeDeals";
import "./Home.css";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<section>
                <HomeDeals />
            </section>
            <section>
                NOw oR Never
            </section>
            <section>
                More Places To Go
            </section>
        </div>
    );
}

export default Home;
