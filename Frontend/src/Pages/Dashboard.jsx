import { useAuth } from "../Context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();
  console.log("User info:", user);

  const renderUserInfo = () => {
    if (user?.provider === "google") {
      return (
        <div className="user-details">
          <div className="user-header">
            {user?.picture && (
              <img
                className="profile-picture"
                src={user.picture}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-avatar.jpg"; // Fallback image
                }}
              />
            )}
            <div className="basic-user-info">
              <h3>{user?.name}</h3>
              <p className="email">{user?.email}</p>
              <span className="provider-badge google">Google Account</span>
            </div>
          </div>
        </div>
      );
    } else if (user?.provider === "github") {
      return (
        <div className="user-details">
          <div className="user-header">
            {user?.picture && (
              <img
                className="profile-picture"
                src={user?.picture}
                alt="Profile"
              />
            )}
            <div className="basic-user-info">
              <h3>{user?.name || user?.username}</h3>
              <p className="email">{user?.email}</p>
              <p className="username">@{user?.username}</p>
              <span className="provider-badge github">GitHub Account</span>
            </div>
          </div>

          <div className="github-stats">
            <div className="stat-card">
              <h4>Public repos</h4>
              <p>{user?.publicrepos || 0}</p>
            </div>
            <div className="stat-card">
              <h4>Followers</h4>
              <p>{user?.followers || 0}</p>
            </div>
            <div className="stat-card">
              <h4>Following</h4>
              <p>{user?.following || 0}</p>
            </div>
          </div>

          {(user?.bio || user?.company || user?.location) && (
            <div className="additional-info">
              {user?.bio && (
                <div className="item-info">
                  <strong>Bio: </strong> {user?.bio}
                </div>
              )}
              {user?.company && (
                <div className="item-info">
                  <strong>Company: </strong> {user?.company}
                </div>
              )}
              {user?.location && (
                <div className="item-info">
                  <strong>Location: </strong> {user?.location}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
  };
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="user-info">
        <h3>Welcome, {user?.name || user?.username}</h3>
        {renderUserInfo()}
      </div>
    </div>
  );
};

export default Dashboard;
