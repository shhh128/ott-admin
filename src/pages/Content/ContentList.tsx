import './Content.scss';
import { Link } from 'react-router-dom';
export default function ContentList() {
    return(
        <div className="content-wrap">
            <div className="title">
                <h3>콘텐츠 관리</h3>
            </div>
            <div className="contents">
                <Link to="/content/new" className='add-btn'>콘텐츠 등록</Link>
                
            </div>
        </div>
    )
}