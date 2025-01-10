import { Link } from 'react-router-dom'
import { UserTableProps } from '../interfaces/UserTableProps'
import '../styles/UserTable.css'
const UserTable = ({ users, page, onDelete, onEdit }: UserTableProps) => {
  return (
    <div className="userTable">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{(page - 1) * 5 + index + 1}</td>
              <td>
                <Link to={`/user/${user._id}`}>
                  {user.firstName} {user.lastName}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button
                  className="deleteButton"
                  onClick={() => onDelete(user._id)}
                >
                  Delete
                </button>
                <button className="editButton" onClick={() => onEdit(user)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
