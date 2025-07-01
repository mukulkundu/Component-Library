import { Outlet } from "react-router-dom";
import NavMenu from "./Navigation/NavMenu";
import NavBar from "./Navigation/NavBar";

export default function Layout(){

    return(
        <>
        <div className=" flex h-screen">
            <div className="w-[15dvw] bg-[#372f59] text-white overflow-y-auto">
                <NavMenu/>
            </div>
            <div className="flex flex-1 flex-col">
                <NavBar/>
                <div className="flex-1 overflow-y-auto">
                    <Outlet/>
                </div>
            </div>
        </div>
        </>
    )
}