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
            <Routing />
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;