import { NavLink } from "react-router-dom";
import { LayoutDashboard, Menu, TvMinimalPlay, Image, MessageSquareHeart, UsersRound, /* UserRoundPen */ } from "lucide-react";
import '../layout/Sidebar.scss';

export default function Sidebar() {
    return(
        <aside className="sidebar">
            <nav className="gnb">
                <ul>
                    <li>
                        <button className="hamburger">
                            <Menu className="menu-icon" />
                        </button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/dashboard" className="menu-list">
                            <LayoutDashboard className="menu-icon" />
                            <span>대시보드</span>
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/content" className="menu-list">
                            <TvMinimalPlay className="menu-icon" />
                            <span>콘텐츠 관리</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/banner" className="menu-list">
                            <Image className="menu-icon" />
                            <span>배너 관리</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/wish" className="menu-list">
                            <MessageSquareHeart className="menu-icon" />
                            <span>공개 요청 콘텐츠</span>
                        </NavLink>
                    </li>
                </ul>
                <ul>
                    <li>
                        <NavLink to="/user" className="menu-list">
                            <UsersRound className="menu-icon" />
                            <span>회원 관리</span>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/admin" className="menu-list">
                            <UserRoundPen className="menu-icon" />
                            <span>운영자 관리</span>
                        </NavLink>
                    </li> */}
                </ul>
            </nav>
        </aside>
    )
}