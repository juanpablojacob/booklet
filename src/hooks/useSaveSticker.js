import { useMutation, useQueryClient } from '@tanstack/react-query';

import supabase from '../utils/supabase';
import useAuth from './useAuth';

export default function useSaveSticker() {
  const queryClient = useQueryClient();
  const { getUser } = useAuth();

  const user = getUser();

  return useMutation({
    mutationFn: async (code) => {
      const { error } = await supabase.from('stickers').insert({ code, user_id: user.id });
      if (error) {
        throw new Error(error);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['stickers']);
    }
  });
}
