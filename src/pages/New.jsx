import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { supabase } from "../utils/supabase.js";
import { getUser } from "../utils/user.js";

import styles from "./New.module.css";

export default function New() {
  const [codes, setCodes] = useState("");
  const [saveError, setSaveError] = useState(null);
  const [showSuccessMessage, toggleShowSuccessMessage] = useState(false);

  function handleInput(event) {
    setCodes(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaveError(null);
    toggleShowSuccessMessage(false);
    const sanitizedCodes = codes
      .split(",")
      .map((code) => code.trim().toUpperCase());
    const { data, error } = await supabase
      .from("stickers")
      .insert(sanitizedCodes.map((code) => ({ code, user_id: getUser().id })));
    if (error) {
      setSaveError(error);
    } else {
      setCodes("");
      toggleShowSuccessMessage(true);
    }
  }

  const isDuplicateError = saveError && saveError.code === "23505";
  const isOtherError = saveError && saveError.code !== "23505";

  return (
    <>
      <h1>New Sticker</h1>
      <p className={styles.homeLink}>
        <Link to="/">Back to home</Link>
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <span>Add the sticker codes</span>
          <input
            type="text"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck="false"
            value={codes}
            onChange={handleInput}
          />
        </label>
        <button disabled={!codes} type="submit">
          Save
        </button>
      </form>
      {showSuccessMessage && <p>Stickers saved! 😉</p>}
      {isDuplicateError && (
        <p className={styles.error}>
          One of the codes you entered is already registered
        </p>
      )}
      {isOtherError && <p className={styles.error}>An error occurred</p>}
    </>
  );
}
