import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "./PageNav";
import { useAuth } from "../Context/LoginAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const { login, isAuthorized } = useAuth();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate("/app", { replace: true });
    }
  }, [isAuthorized]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              login(email, password);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </main>
  );
}
