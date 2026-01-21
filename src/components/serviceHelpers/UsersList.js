import React from 'react';
import './button.css';

const UsersList = ({ users, onDeleteUser }) => {
  return (
    <div className="product-list">
      {users.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No users found</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id || user._id}>
              <div>
                <strong>Name:</strong> {user.username || 'N/A'}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}
              </div>
              <div>
                <strong>Joined:</strong> {new Date(user.createdAt || user.created_at).toLocaleDateString()}
              </div>
              <button 
                className="btn btn-danger edit-button" 
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete user ${user.email}?`)) {
                    onDeleteUser(user.id || user._id);
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
