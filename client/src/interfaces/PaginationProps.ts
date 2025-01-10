export interface PaginationProps {
  page: number
  totalUsers: number
  itemsPerPage: number
  onNext: () => void
  onPrevious: () => void
}
