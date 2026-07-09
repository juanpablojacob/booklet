import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';

import supabase from '../utils/supabase';

const KEY = 'BOOKLET_USER';

let loggedUser = null;

export default function useAuth() {
  const navigate = useNavigate();

  function getUser() {
    if (!loggedUser) {
      loggedUser = JSON.parse(sessionStorage.getItem(KEY));
    }
    return loggedUser;
  }

  const {
    mutate: authenticateUser,
    isPending: authenticating,
    error: authenticationError
  } = useMutation({
    mutationFn: async (name) => {
      const { data, error } = await supabase.from('users').select().eq('name', name).single();
      if (error) {
        throw new Error('User not found');
      }
      return data;
    },
    onSuccess: (user) => {
      loggedUser = user;
      sessionStorage.setItem(KEY, JSON.stringify(user));
      navigate('/');
    }
  });

  return { getUser, authenticateUser, authenticating, authenticationError };
}
