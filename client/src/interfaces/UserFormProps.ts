import { User } from './User'

export interface UserFormProps {
  user?: User
  onUserAdded: () => void
}
