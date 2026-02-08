import UserCard from '../components/UserCard'
import { useadmin } from '../service/useadmin';
import "../css/userpage.css";
const UserPage = () => {
  const { users, deleteUser } = useadmin();
  return (
    <div className="users-page">
      <h3 className="users-title">All Users</h3>
      <div className="users-grid">
        {users.length === 0 ? (
          <div className="no-users">No users found</div>
        ) : (
          users.map(user => (
            <UserCard key={user.email} user={user} onDelete={deleteUser} />
          ))
        )}
      </div>
    </div>
  )
}

export default UserPage