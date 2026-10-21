import { UserManagement } from './components/user/UserManagement';
import './App.css';

export function App() {
  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>User Management</h1>
          <p className="subtitle">Powered by TanStack Query & Mutations</p>
        </div>
      </header>

      <UserManagement />
    </div>
  );
}

export default App;
