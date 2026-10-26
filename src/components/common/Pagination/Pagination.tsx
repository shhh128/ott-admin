import './Pagination.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page:number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange
}: PaginationProps) {
    const pages = Array.from(
        {length: totalPages},
        (_, index) => index + 1
    );
    
    return (
        <div className="pagination">
            <button 
                type="button"
                disabled={currentPage <= 1}
                onClick={()=>onPageChange(currentPage - 1)}
            >
                이전
            </button>
            {pages.map((page)=>(
                <button 
                    key={page} 
                    type="button"
                    className={currentPage === page ? 'active' : ''}
                    aria-current={currentPage === page ? 'page' : undefined}
                    onClick={()=>onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button 
                type="button"
                disabled={currentPage >= totalPages}
                onClick={()=>onPageChange(currentPage + 1)}
            >
                다음
            </button>
        </div>
    );
}