import { useAuth } from "../Context/AuthContext";

const Login = () => {
  const { loginWithGoogle, loginWithGitHub } = useAuth();

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome</h2>
        <p>Please Sign in to continue</p>
        <div className="login-buttons">
          <button
            onClick={loginWithGoogle}
            className="login-button google-button"
          >
            Sign in with Google
          </button>
          <button
            onClick={loginWithGitHub}
            className="login-button github-button"
          >
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
