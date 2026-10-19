import { Plus, RotateCcw, Search } from 'lucide-react';
import './Content.scss';
import { Link } from 'react-router-dom';
export default function ContentList() {
    return(
        <div className="content-wrap">
            <div className="title">
                <h3>콘텐츠 관리</h3>
            </div>
            <div className="content-top">
                <Link to="/content/new" className='add-btn'>
                    <Plus className='plus-icon' />
                    <span>콘텐츠 등록</span>
                </Link>
            </div>
            <div className="contents">
                <form 
                    className="content-search"
                    onSubmit={(e)=>{
                        e.preventDefault();
                    }}
                >
                    <div className="search-box">
                        <label htmlFor="content-title" className='sr-only'>제목</label>
                        <Search className='search-icon' size={20} aria-hidden="true"
                        />
                        <input 
                            id='content-title'
                            name='title'
                            type="search"
                            placeholder='제목을 입력하세요.'
                        />
                    </div>
                    <div className="filter-box">
                        <label htmlFor="content-type" className='sr-only'>종류</label>
                        <select 
                            id="content-type"
                            name="type"
                            defaultValue="ALL"
                        >
                            <option value="ALL">전체 종류</option>
                            <option value="MOVIE">영화</option>
                            <option value="SERIES">시리즈</option>
                        </select>
                    </div>
                    <div className="filter-box">
                        <label htmlFor="content-status" className='sr-only'>공개 상태</label>
                        <select 
                            id="content-status"
                            name="status" 
                            defaultValue="ALL"
                        >
                            <option value="ALL">전체 상태</option>
                            <option value="PUBLIC">공개</option>
                            <option value="PRIVATE">비공개</option>
                        </select>
                    </div>
                    <button type='submit' className='search-btn'>검색</button>
                    <button
                        type='reset'
                        className='reset-btn'
                        aria-label='검색 조건 초기화'
                        title='검색 조건 초기화'
                    >
                        <RotateCcw aria-hidden="true" />
                    </button>
                </form>
            </div>
        </div>
    )
}