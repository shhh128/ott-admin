import { ChevronDown, Plus, RotateCcw, Search } from 'lucide-react';
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
                        <ChevronDown 
                            className='arrow-down'
                            size={18}
                            aria-hidden="true"
                        />
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
                        <ChevronDown 
                            className='arrow-down'
                            size={18}
                            aria-hidden="true"
                        />
                    </div>
                    <button type='submit' className='search-btn'>검색</button>
                    <button
                        type='reset'
                        className='reset-btn'
                        aria-label='검색 조건 초기화'
                        title='초기화'
                    >
                        <RotateCcw aria-hidden="true" />
                    </button>
                </form>
                <div className="content-list">
                    <div className="list-header">
                        <div className="header-l">
                            <p>총 <strong>0</strong>개의 콘텐츠</p>
                            <button
                                type='button'
                                className='delete-btn'
                                disabled
                            >
                                선택 삭제
                            </button>
                        </div>
                        <div className="header-r filter-box">
                            <label htmlFor="content-sort" className='sr-only'>콘텐츠 정렬</label>
                            <select 
                                id="content-sort"
                                name="sort" 
                                defaultValue="LATEST"
                            >
                                <option value="LATEST">최신순</option>
                                <option value="TITLE">제목순</option>
                            </select>
                            <ChevronDown 
                                className='select-arrow'
                                size={18}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <table className='content-table'>
                        <thead>
                            <tr>
                                <th scope='col'>
                                    <input 
                                        type="checkbox" 
                                        aria-label='현재 페이지 콘텐츠 전체 선택'
                                    />
                                </th>
                                <th scope='col'>번호</th>
                                <th scope='col'>썸네일</th>
                                <th scope='col'>종류</th>
                                <th scope='col'>제목</th>
                                <th scope='col'>장르</th>
                                <th scope='col'>공개일</th>
                                <th scope='col'>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input 
                                        type="checkbox" 
                                        aria-label='프렌즈 선택'
                                    />
                                </td>
                                <td>1</td>
                                <td>
                                    <Link to="/content/1/edit" aria-label='프렌즈 수정'>
                                        <img 
                                            className='content-thumbnail'
                                            src="" 
                                            alt="" 
                                        />
                                    </Link>
                                </td>
                                <td>시리즈</td>
                                <td className='content-title'>
                                    <Link to="/content/1/edit">
                                        프렌즈
                                    </Link>
                                </td>
                                <td>시트콤, 코미디</td>
                                <td>2026.08.25</td>
                                <td>
                                    <span className='content-status is-public'>
                                        공개
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}