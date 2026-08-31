import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import '../layouts/AdminLayout.scss';

export default function AdminLayout() {
    return(
        <div className="admin-layout">
            <Header />

            <div className="admin-body">
                <Sidebar />

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}