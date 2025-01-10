import { PaginationProps } from '../interfaces/PaginationProps';
import '../styles/Pagination.css';

const Pagination = ({
  page,
  totalUsers,
  itemsPerPage,
  onNext,
  onPrevious,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const hasPreviousData = page > 1;
  const hasMoreData = page < totalPages;

  if (totalPages === 0) page = 0;
  return (
    <div className="pagination">
      <button
        className="paginationButton prev"
        onClick={onPrevious}
        disabled={!hasPreviousData}
      >
        &#8249; Previous
      </button>
      <span className="paginationText">
        Page {page} of {totalPages}
      </span>
      <button
        className="paginationButton next"
        onClick={onNext}
        disabled={!hasMoreData}
      >
        Next &#8250;
      </button>
    </div>
  );
};

export default Pagination;
