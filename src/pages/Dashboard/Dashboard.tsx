import { CircleChevronRight, Info, ListPlus, SquarePlay, UserRoundPlus, UsersRound } from 'lucide-react';
import { Link } from "react-router-dom";
import './Dashboard.scss';
import PieChart from '../../components/charts/PieChart';
import BarChart from '../../components/charts/BarChart';
import LineChart from '../../components/charts/LineChart';
import { useEffect, useState } from 'react';
import { getContentCount } from '../../api/contentApi';

export default function Dashboard() {

    const [contentCount, setContentCount] = useState<number | null>(null);

    const now = new Date();
    const dateText = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}시 기준입니다.`;
    // yy.mm.dd hh
    // const dateText = `${String(now.getFullYear()).slice(-2)}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}시 기준입니다.`;

    useEffect(()=>{
        getContentCount()
            .then(setContentCount)
            .catch(console.error);
    }, []);

    return(
        <div className="dashboard-wrap">
            <div className="title">
                <h3>대시보드</h3>
                <p>* 총 콘텐츠 수 외에는 샘플 데이터입니다.</p>
            </div>
            <div className="contents">
                <div className="grid-wrap">
                    <div className="box content">
                        <div className="box-title">
                            <SquarePlay className='icon c' />
                            <h5>총 콘텐츠 수</h5>
                        </div>
                        <div className="box-contents">
                            <p>{contentCount === null ? '-' : `${contentCount.toLocaleString()}개`}</p>
                            <Link to="/content" className='shortcut'>
                                <CircleChevronRight />
                            </Link>
                        </div>
                    </div>
                    <div className="box open">
                        <div className="box-title">
                            <ListPlus className='icon o' />
                            <h5>공개 예정 콘텐츠 수</h5>
                        </div>
                        <div className="box-contents">
                            <p>50개</p>
                        </div>
                    </div>
                    <div className="box user">
                        <div className="box-title">
                            <UsersRound className='icon u' />
                            <h5>전체 회원 수</h5>
                        </div>
                        <div className="box-contents">
                            <p>2,458명</p>
                            <Link to="/member" className='shortcut'>
                                <CircleChevronRight />
                            </Link>
                        </div>
                    </div>
                    <div className="box new">
                        <div className="box-title">
                            <UserRoundPlus className='icon n' />
                            <h5>신규 가입자 수</h5>
                            <div className="info-wrap">
                                <button className='info-btn'>
                                    <Info className='info-icon' />
                                </button>
                                <div className="tooltip">
                                    <p>{dateText}</p>
                                </div>
                            </div>
                        </div>
                        <div className="box-contents">
                            <p>34명</p>
                        </div>
                    </div>
                    <div className="box pie">
                        <h5>콘텐츠 현황 차트</h5>
                        <div className="chart-wrap">
                            <PieChart />
                        </div>
                    </div>
                    <div className="box bar">
                        <h5>공개 현황 차트</h5>
                        <div className="chart-wrap">
                            <BarChart />
                        </div>
                    </div>
                    <div className="box line">
                        <h5>가입자 추이</h5>
                        <div className="chart-wrap">
                            <LineChart />
                        </div>
                    </div>
                </div>
                <div className="top-wrap">
                    
                </div>
                <div className="wish-wrap">

                </div>
                <div className="notice-wrap">

                </div>
            </div>
        </div>
    )
}