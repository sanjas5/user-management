import { User } from './User'

export interface UserTableProps {
  users: User[]
  page: number
  onDelete: (userId: string) => void
  onEdit: (user: User) => void
}
