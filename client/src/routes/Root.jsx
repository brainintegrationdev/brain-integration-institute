import { Outlet } from "react-router-dom";
import { Navbar } from "../components/header/Navbar";

export const Root = () => {
    return (
        <div>
            <Navbar />
            <section>
                <Outlet />
            </section>
        </div>
    )
}