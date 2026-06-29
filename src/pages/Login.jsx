import { useNavigate } from "react-router";

import { supabase } from "../utils/supabase.js";

import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  function onSubmit(event) {
    async function authUser(name) {
      const { data: user } = await supabase
        .from("users")
        .select()
        .eq("name", name)
        .single();
      if (!user) throw new Error("USER_NOT_FOUND");
      sessionStorage.setItem("BOOKLET_USER", JSON.stringify(user));
      navigate("/");
    }
    event.preventDefault();
    const name = new FormData(event.target).get("name");
    authUser(name);
  }

  return (
    <section>
      <h1>Booklet</h1>
      <form className={styles.form} autoComplete="off" onSubmit={onSubmit}>
        <label className={styles.field}>
          <span>Name</span>
          <input
            type="text"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            name="name"
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}
