
import Navbar from '../components/navbar';
import Header from '../components/header';
import Home from '../components/home';

function HomeIndex() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Header />
                        <Navbar />
                        <Home />                        
                    </main>
                </div>
            </div>
        </>
    )
}
export default HomeIndex;