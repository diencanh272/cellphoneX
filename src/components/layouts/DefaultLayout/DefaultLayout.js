import Header from '../Header';
import Footer from '../Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <header>
                <Header />
            </header>
            <main>{children}</main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default DefaultLayout;
