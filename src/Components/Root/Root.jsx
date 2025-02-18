import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";


const Root = () => {
    return (
        <div className="font-roboto">

            <Navbar></Navbar>
            <div className="max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
            <Toaster></Toaster>
            <Tooltip id="my-tooltip"></Tooltip>

        </div>
    );
};

export default Root;