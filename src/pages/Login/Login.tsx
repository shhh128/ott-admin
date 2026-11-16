import './Login.scss';
import type { SubmitEvent } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/Netflix_Logo.png';
import { useRef } from 'react';

export default function Login() {

    const navigate = useNavigate();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const fillDemoAccount = ()=>{
        if (emailRef.current && passwordRef.current){
            emailRef.current.value = 'admin@ott.example';
            passwordRef.current.value = 'ottadmin123';
        }
    }

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
                    <img src={logo} alt="로고" />
                    <p>ADMIN</p>
                </div>
                <div className="login-box">
                    <h2>로그인</h2>
                    <form onSubmit={handleLogin}>
                        <ul className="input-box">
                            <li>
                                <label htmlFor="userId" className='sr-only'>이메일</label>
                                <input 
                                    ref={emailRef}
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
                                    ref={passwordRef}
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
                    {/* <p>자세한 사항은 관리자에게 문의하세요.<br />
                        <a href="mailto:admin@ott.com">admin@ott.com</a>
                    </p> */}
                    <div className="demo-guide">
                        <p>
                            현재 개발 중인 프로젝트입니다.<br />
                            콘텐츠 조회·검색·등록·삭제 기능을 확인할 수 있습니다.
                        </p>
                        <button type='button' onClick={fillDemoAccount}>데모 계정 입력하기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}