import { useState } from 'react';
import { useUsers } from '../../hooks/useUsers';
import { useDeleteUser } from '../../hooks/useDeleteUser';

export function UserList() {
  const { data: users, isPending, isError, error, isFetching, refetch } = useUsers();
  const deleteMutation = useDeleteUser();
  const [simulateDeleteFailure, setSimulateDeleteFailure] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDelete = (userId: number) => {
    deleteMutation.mutate(
      { userId, simulateFailure: simulateDeleteFailure },
      {
        onSuccess: () => {
          setSuccessMessage('User deleted successfully.');
          setTimeout(() => setSuccessMessage(''), 3500);
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="users-loading">
        <p>Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-box" role="alert">
        <h3>Failed to Load Users</h3>
        <p>{error instanceof Error ? error.message : 'An error occurred while fetching users.'}</p>
        <button type="button" onClick={() => void refetch()} className="btn-secondary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="users-header">
        <div>
          <h3>Users ({users?.length ?? 0})</h3>
          {isFetching && <span className="status-text"> (Syncing...)</span>}
        </div>

        <label className="simulate-delete-label">
          <input
            type="checkbox"
            checked={simulateDeleteFailure}
            onChange={(e) => setSimulateDeleteFailure(e.target.checked)}
          />
          Simulate Delete Failure
        </label>
      </div>

      {deleteMutation.isPending && (
        <div className="alert alert-info" role="status">
          Deleting user from server...
        </div>
      )}

      {successMessage && !deleteMutation.isPending && (
        <div className="alert alert-success" role="status">
          {successMessage}
        </div>
      )}

      {deleteMutation.isError && !deleteMutation.isPending && (
        <div className="alert alert-error" role="alert">
          {deleteMutation.error.message} (Previous data restored)
        </div>
      )}

      {users?.length === 0 ? (
        <p className="status-text">No users found.</p>
      ) : (
        <ul className="users-list">
          {users?.map((user) => (
            <li key={user.id} className="user-item">
              <div className="user-details">
                <strong>{user.name}</strong>
                <span className="user-email">{user.email}</span>
              </div>
              <div className="user-actions">
                <span className="user-role">{user.role}</span>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => handleDelete(user.id)}
                  disabled={deleteMutation.isPending && deleteMutation.variables?.userId === user.id}
                  aria-label={`Delete ${user.name}`}
                >
                  {deleteMutation.isPending && deleteMutation.variables?.userId === user.id
                    ? 'Deleting...'
                    : 'Delete'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
