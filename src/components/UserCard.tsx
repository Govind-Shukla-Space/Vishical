import "../css/usercard.css";
import type { User } from '../model/user';
type Props = {
  user: User;
  onDelete: (email: string) => void;
}
const UserCard = ({ user, onDelete }: Props) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        {user.name}
      </div>

      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <span className={`role-badge ${user.role}`}>
          {user.role}
        </span>
      </div>

      <button className="delete-btn" onClick={() => onDelete(user.email)}>
        Delete User
      </button>
    </div>
  );
}

export default UserCard