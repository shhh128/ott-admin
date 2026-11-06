import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import '../layouts/AdminLayout.scss';
import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

export default function AdminLayout() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const {data} = supabase.auth.onAuthStateChange(
            (_event, currentSession)=>{
                setSession(currentSession);
                setLoading(false);
            }
        );

        return ()=>{
            data.subscription.unsubscribe();
        }
    }, []);

    if (loading){
        return <p>로그인 상태를 확인하고 있습니다.</p>
    }

    if (!session){
        return <Navigate to="/login" replace />
    }

    return(
        <div className="admin-layout">
            <Header email={session.user.email ?? ''} />

            <div className="admin-body">
                <Sidebar />

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}