import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function TestLogin() {
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, "test_user@example.com", "test1234");
      window.location.href = "/";
    } catch (err) {
      console.error("Błąd logowania:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Test Login</h1>
      <button
        onClick={handleLogin}
        style={{
          padding: "0.5rem 1rem",
          background: "green",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Zaloguj test_user
      </button>
    </div>
  );
}
