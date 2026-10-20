import { UserForm } from './UserForm';
import { UserList } from './UserList';
import './UserManagement.css';

export function UserManagement() {
  return (
    <section className="user-management-section">
      <div className="user-management-grid">
        <div className="user-form-col">
          <UserForm />
        </div>
        <div className="user-list-col">
          <UserList />
        </div>
      </div>
    </section>
  );
}
