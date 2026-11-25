import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (<><Navbar />
        <main className="min-h-[calc(100vh-100px)]"> {/* adjust height */}
            <Outlet />  {/* yaha har subpage render hoga */}
        </main></>)
}