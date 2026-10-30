import { ChevronDown, Plus, RotateCcw, Search } from 'lucide-react';
import './Content.scss';
import { Link } from 'react-router-dom';
import contentData from '../../mock/contents.json';
import { useState } from 'react';
import Pagination from '../../components/common/Pagination/Pagination';

export default function ContentList() {
    const [contents, setContents] = useState(contentData);

    const [searchTitle, setSearchTitle] = useState('');
    const [appliedTitle, setAppliedTitle] = useState('');

    const [selectedType, setSelectedType] = useState('ALL');
    const [selectedStatus, setSelectedStatus] = useState('ALL');

    const [appliedType, setAppliedType] = useState('ALL');
    const [appliedStatus, setAppliedStatus] = useState('ALL');

    const [sortOrder, setSortOrder] = useState('CREATED');

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const filteredContents = contents.filter((content)=>{
        const matchesTitle = content.title 
            .replace(/\s+/g, '')
            .toLowerCase()
            .includes(appliedTitle.trim().toLowerCase());

        const matchesType =
            appliedType === 'ALL' || content.type === appliedType;

        const matchesStatus =
            appliedStatus === 'ALL' || content.status === appliedStatus;

        return matchesTitle && matchesType && matchesStatus;
    });

    const sortedContents = [...filteredContents].sort((a, b)=>{
        if (sortOrder === 'TITLE'){
            return a.title.localeCompare(b.title, 'ko');
        }

        const dateKey = 
            sortOrder === 'RELEASE' ? 'releaseDate' : 'createdAt';

        return (
            new Date(b[dateKey]).getTime() - 
            new Date(a[dateKey]).getTime()
        )
    });

    const totalPages = Math.ceil(sortedContents.length / itemsPerPage);
    
    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentContents = sortedContents.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const handleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id]
        );
    };

    const isAllSelected =
        currentContents.length > 0 &&
        currentContents.every((content)=>
            selectedIds.includes(content.id)
        );

    const handleSelectAll = ()=>{
        setSelectedIds(
            isAllSelected
                ? []
                : currentContents.map((content)=>content.id)
        );
    };

    const handleDeleteSelected = ()=>{
        const confirmed = window.confirm(
            `선택한 콘텐츠 ${selectedIds.length}개를 삭제하시겠습니까?`
        )

        if (!confirmed) return;

        setContents((prev)=>
            prev.filter((content)=>!selectedIds.includes(content.id))
        );
        setSelectedIds([]);
        setCurrentPage(1);
    };

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
                        setAppliedTitle(searchTitle);
                        setAppliedType(selectedType);
                        setAppliedStatus(selectedStatus);
                        setCurrentPage(1);
                        setSelectedIds([]);
                    }}
                    onReset={()=>{
                        setSearchTitle('');
                        setSelectedType('ALL');
                        setSelectedStatus('ALL');
                        setAppliedTitle('');
                        setAppliedType('ALL');
                        setAppliedStatus('ALL');
                        setCurrentPage(1);
                        setSelectedIds([]);
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
                            value={searchTitle}
                            onChange={(e)=>setSearchTitle(e.target.value)}
                        />
                    </div>
                    <div className="filter-box">
                        <label htmlFor="content-type" className='sr-only'>종류</label>
                        <select 
                            id="content-type"
                            name="type"
                            value={selectedType}
                            onChange={(e)=>setSelectedType(e.target.value)}
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
                            value={selectedStatus}
                            onChange={(e)=>setSelectedStatus(e.target.value)}
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
                            <p>총 <strong>{filteredContents.length}</strong>개의 콘텐츠</p>
                            <button
                                type='button'
                                className='delete-btn'
                                disabled={selectedIds.length === 0}
                                onClick={handleDeleteSelected}
                            >
                                선택 삭제
                            </button>
                        </div>
                        <div className="header-r filter-box">
                            <label htmlFor="content-sort" className='sr-only'>콘텐츠 정렬</label>
                            <select 
                                id="content-sort"
                                name="sort" 
                                value={sortOrder}
                                onChange={(e)=>{
                                    setSortOrder(e.target.value);
                                    setCurrentPage(1);
                                    setSelectedIds([]);
                                }}
                            >
                                <option value="CREATED">등록일순</option>
                                <option value="RELEASE">공개일순</option>
                                <option value="TITLE">제목순</option>
                            </select>
                            <ChevronDown 
                                className='select-arrow'
                                size={18}
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    <div className="content-table-wrap">
                        <table className='content-table'>
                            <colgroup>
                                <col className='col-check' />
                                <col className='col-number' />
                                <col className='col-thumbnail' />
                                <col className='col-type' />
                                <col className='col-title' />
                                <col className='col-genre' />
                                <col className='col-date' />
                                <col className='col-status' />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope='col'>
                                        <input 
                                            type="checkbox" 
                                            aria-label='현재 페이지 콘텐츠 전체 선택'
                                            checked={isAllSelected}
                                            onChange={handleSelectAll}
                                            disabled={currentContents.length === 0}
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
                                {filteredContents.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className='empty-message'>
                                            검색 조건에 맞는 콘텐츠가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    currentContents.map((content, index)=>(
                                        <tr key={content.id}>
                                            <td>
                                                <input 
                                                    type="checkbox" 
                                                    aria-label={`${content.title} 선택`}
                                                    checked={selectedIds.includes(content.id)}
                                                    onChange={()=>handleSelect(content.id)}
                                                />
                                            </td>
                                            <td>{startIndex + index + 1}</td>
                                            <td>
                                                <Link to={`/content/${content.id}/edit`} aria-label={`${content.title} 수정`}>
                                                    <img 
                                                        className='content-thumbnail'
                                                        src={content.thumbnail} 
                                                        alt={`${content.title} 썸네일`} 
                                                    />
                                                </Link>
                                            </td>
                                            <td>
                                                {content.type === 'MOVIE' ? '영화' : '시리즈'}
                                            </td>
                                            <td className='content-title'>
                                                <Link 
                                                    to={`/content/${content.id}/edit`}
                                                    className='content-title-link'
                                                    title={content.title}
                                                >
                                                    {content.title}
                                                </Link>
                                            </td>
                                            <td>
                                                <span
                                                    className='content-genres'
                                                    title={content.genres.join(', ')}
                                                >
                                                    {content.genres.join(', ')}
                                                </span>
                                            </td>
                                            <td>{content.releaseDate.replaceAll('-', '.')}</td>
                                            <td>
                                                <span 
                                                    className={`content-status ${
                                                        content.status === 'PUBLIC'
                                                            ? 'is-public'
                                                            : 'is-private'
                                                    }`}
                                                >
                                                    {content.status === 'PUBLIC' ? '공개' : '비공개'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 1 && (
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages}
                            onPageChange={(page)=>{
                                setCurrentPage(page);
                                setSelectedIds([]);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}