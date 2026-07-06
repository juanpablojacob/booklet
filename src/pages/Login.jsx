import { useState } from "react";
import { useNavigate } from "react-router";

import { supabase } from "../utils/supabase.js";

import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function onSubmit(event) {
    async function authUser(name) {
      try {
        const { data: user } = await supabase
          .from("users")
          .select()
          .eq("name", name)
          .single();
        if (!user) throw new Error("USER_NOT_FOUND");
        sessionStorage.setItem("BOOKLET_USER", JSON.stringify(user));
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    event.preventDefault();
    const name = new FormData(event.target).get("name");
    setLoading(true);
    authUser(name);
  }

  return (
    <form className={styles.form} autoComplete="off" onSubmit={onSubmit}>
      <h1>Booklet</h1>
      <label>
        <span>Username</span>
        <input
          type="text"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          name="name"
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}
