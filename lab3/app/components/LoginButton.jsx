import { useAuth } from "../contexts/AuthContext";

export default function LoginButton() {
  const { currentUser, loginWithGoogle, logout } = useAuth();

  return (
    <div className="auth-container">
      {currentUser ? (
        <div className="user-menu">
            <button onClick={logout} className="login-btn">
                Wyloguj
            </button>
            <img 
                src={currentUser.photoURL} 
                alt="User avatar" 
                className="user-avatar"
                referrerPolicy="no-referrer"
            />
        </div>
      ) : (
        <button onClick={loginWithGoogle} className="login-btn">
            Zaloguj
        </button>
      )}
    </div>
  );
}