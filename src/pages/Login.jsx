import { useState } from 'react';

import useAuth from '../hooks/useAuth';

import styles from './Login.module.css';

export default function Login() {
  const { authenticateUser, authenticating, authenticationError } = useAuth();

  async function onSubmit(event) {
    event.preventDefault();
    const name = new FormData(event.target).get('name');
    authenticateUser(name);
  }

  return (
    <>
      <form className={styles.form} autoComplete="off" onSubmit={onSubmit}>
        <h1>Booklet</h1>
        <label>
          <span>Username</span>
          <input type="text" autoCapitalize="off" autoCorrect="off" spellCheck="false" name="name" />
        </label>
        <button type="submit" disabled={authenticating}>
          {authenticating ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      {authenticationError && <p className={styles.error}>{authenticationError.message}</p>}
    </>
  );
}
