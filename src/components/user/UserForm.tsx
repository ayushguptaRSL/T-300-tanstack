import { useState, type FormEvent } from 'react';
import { useCreateUser } from '../../hooks/useCreateUser';

export function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { mutate, isPending, isError, error } = useCreateUser();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    mutate(
      { name: name.trim(), email: email.trim(), role, simulateFailure },
      {
        onSuccess: (newUser) => {
          setName('');
          setEmail('');
          setRole('Developer');
          setSimulateFailure(false);
          setSuccessMessage(`User "${newUser.name}" added successfully.`);
          setTimeout(() => setSuccessMessage(''), 4000);
        },
      }
    );
  };

  return (
    <form className="user-form" onSubmit={handleSubmit} aria-busy={isPending}>
      <h3>Add New User</h3>

      {isPending && (
        <div className="alert alert-info" role="status">
          Saving new user, please wait...
        </div>
      )}

      {successMessage && !isPending && (
        <div className="alert alert-success" role="status">
          {successMessage}
        </div>
      )}

      {isError && !isPending && (
        <div className="alert alert-error" role="alert">
          {error instanceof Error ? error.message : 'Failed to create user. Please try again.'}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="user-name">Name</label>
        <input
          id="user-name"
          type="text"
          placeholder="e.g. John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isPending}
        />
      </div>

      <div className="form-group">
        <label htmlFor="user-email">Email</label>
        <input
          id="user-email"
          type="email"
          placeholder="e.g. john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isPending}
        />
      </div>

      <div className="form-group">
        <label htmlFor="user-role">Role</label>
        <select
          id="user-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled={isPending}
        >
          <option value="Admin">Admin</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
          <option value="User">User</option>
        </select>
      </div>

      <div className="form-group checkbox-group">
        <label htmlFor="simulate-failure" className="checkbox-label">
          <input
            id="simulate-failure"
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
            disabled={isPending}
          />
          Simulate failure
        </label>
      </div>

      <button
        type="submit"
        className="btn-submit"
        disabled={isPending}
      >
        {isPending ? 'Adding User...' : 'Add User'}
      </button>
    </form>
  );
}
