
import Navbar from '../../src/components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from "react-router-dom";


const MainLayout = () => {
    return (
        <div className='min-h-screen bg-base-200 text-base-content'>
            
            <Navbar></Navbar>

            <section>
                <Outlet></Outlet>
            </section>

            
                <Footer></Footer>
        </div>
    );
};

export default MainLayout;