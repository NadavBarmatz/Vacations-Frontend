import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import likesService from "../../../Services/LikesService";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
    return (
        <div className="Layout">
			<nav>
                <Navbar />
            </nav>
            <header>
                <Header />
            </header>
            <section>
                <Routing />
            </section>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
