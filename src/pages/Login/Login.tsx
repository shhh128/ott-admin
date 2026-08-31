import './Login.scss';

export default function Login() {
    return(
        <div className="login-wrap">
            <div className="login-container">
                <div className="logo">
                    <img src="/src/assets/images/Netflix_Logo.png" alt="넷플릭스 로고" />
                    <p>ADMIN</p>
                </div>
                <div className="login-box">
                    <h2>로그인</h2>
                    <form action="">
                        <ul className="input-box">
                            <li>
                                <label htmlFor="userId"></label>
                                <input type="text" name='user_id' id='userId' placeholder='아이디를 입력해주세요.' />
                            </li>
                            <li>
                                <label htmlFor="userPw"></label>
                                <input type="text" name='user_pw' id='userPw' placeholder='비밀번호를 입력해주세요.' />
                            </li>
                        </ul>
                        <div className="login-btn">
                            <button className='loginBtn'>로그인</button>
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