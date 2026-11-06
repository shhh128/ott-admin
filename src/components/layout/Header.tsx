import '../layout/Header.scss';
import { supabase } from '../../lib/supabase';

interface HeaderProps {
    email: string;
}

export default function Header({email}: HeaderProps) {
    const accountName = email.split('@')[0];

    const handleLogout = async ()=>{
        const {error} = await supabase.auth.signOut({
            scope: 'local'
        });

        if (error){
            console.error('로그아웃 요청 오류:', error)
        }
    }

    return(
        <header>
            <div className="logo">
                <a href="/dashboard">
                    <img src="/src/assets/images/Netflix_Logo.png" alt="넷플릭스 로고" />
                    <p>ADMIN</p>
                </a>
            </div>
            <div className='header-menu'>
                <div className='notice'>
                    <a href="/notice">
                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill='currentColor' d="M20 3.5v1.197L4 8.254V7.5H2v8h2v-.754l1 .223V18.5c0 .459.313.858.757.971l4 1a1 1 0 001.042-.371l2.471-3.293L20 18.301V19.5h2v-16h-2zM9.598 18.369L7 17.719v-2.307l4.127.918-1.529 2.039zM4 12.697v-2.394l16-3.557v9.508L4 12.697z"></path></svg>
                    </a>
                </div>
                <div className='notification'>
                    <a href="/notification">
                        <svg viewBox="0 0 24 24" width="24" height="24" data-icon="BellMedium" data-icon-id=":R1bikiaq:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill='currentColor' fillRule="evenodd" d="M13 4.07A7 7 0 0 1 19 11v4.25q1.58.12 3.1.28l-.2 2a93 93 0 0 0-19.8 0l-.2-2q1.52-.15 3.1-.28V11a7 7 0 0 1 6-6.93V2h2zm4 11.06V11a5 5 0 0 0-10 0v4.13a97 97 0 0 1 10 0m-8.37 4.24C8.66 20.52 10.15 22 12 22s3.34-1.48 3.37-2.63c.01-.22-.2-.37-.42-.37h-5.9c-.23 0-.43.15-.42.37" clipRule="evenodd"></path></svg>
                    </a>
                </div>
                <div className='account'>
                    <svg viewBox="0 0 24 24" width="24" height="24" data-icon="UserMedium" data-icon-id=":r45:" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill='currentColor' fillRule="evenodd" d="M15 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m2 0A5 5 0 1 1 7 5a5 5 0 0 1 10 0M4 21a8 8 0 1 1 16 0v.514A68 68 0 0 1 12 22a68 68 0 0 1-8-.486zm17.15 2.378-.15-.99.151.99a1 1 0 0 0 .849-.99V21c0-5.523-4.477-10-10-10S2 15.477 2 21v1.389a1 1 0 0 0 .849.988L3 22.39c-.151.988-.15.988-.15.989h.003l.01.002.038.005.142.02q.186.027.535.072A70 70 0 0 0 12 24a70 70 0 0 0 8.422-.523q.35-.045.535-.072l.142-.02.038-.005.01-.002z" clipRule="evenodd"></path></svg>
                    <span className='account-name'>{accountName}</span>
                    <button 
                        type='button' 
                        className='logout-btn'
                        onClick={handleLogout}
                    >
                        로그아웃
                    </button>
                </div>
            </div>
        </header>
    )
}