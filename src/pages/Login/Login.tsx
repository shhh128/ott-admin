import './Login.scss';
import type { SubmitEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate();

    const handleLogin = async (e: SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '');

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error){
            alert('이메일 또는 비밀번호를 확인해주세요.');
            return;
        }

        navigate('/dashboard', {replace: true});
    }

    return(
        <div className="login-wrap">
            <div className="login-container">
                <div className="logo">
                    <img src="/src/assets/images/Netflix_Logo.png" alt="넷플릭스 로고" />
                    <p>ADMIN</p>
                </div>
                <div className="login-box">
                    <h2>로그인</h2>
                    <form onSubmit={handleLogin}>
                        <ul className="input-box">
                            <li>
                                <label htmlFor="userId" className='sr-only'>이메일</label>
                                <input 
                                    type="email" 
                                    name='email' 
                                    id='userId' 
                                    placeholder='이메일을 입력해주세요.' 
                                    autoComplete='username'
                                    required
                                />
                            </li>
                            <li>
                                <label htmlFor="userPw" className='sr-only'>비밀번호</label>
                                <input 
                                    type="password" 
                                    name='password' 
                                    id='userPw' 
                                    placeholder='비밀번호를 입력해주세요.' 
                                    autoComplete='current-password'
                                    required
                                />
                            </li>
                        </ul>
                        <div className="login-btn">
                            <button type='submit' className='loginBtn'>로그인</button>
                        </div>
                    </form>
                    <p>자세한 사항은 관리자에게 문의하세요.<br />
                        <a href="mailto:admin@netflix.com">admin@netflix.com</a>
                    </p>
                </div>
            </div>
        </div>
    )
}