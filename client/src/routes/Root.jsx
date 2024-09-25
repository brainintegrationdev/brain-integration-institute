import { Outlet } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar } from "../components/header/Navbar";
// import { CloudinaryProvider } from './CloudinaryProvider';

export const Root = () => {
    const { user, isLoading } = useAuth0();

    if (!user) {
        return <Navbar />;
    }
    return (
        <div>
            <Navbar />
            <section>
                <Outlet />
            </section>
        </div>
    )
}