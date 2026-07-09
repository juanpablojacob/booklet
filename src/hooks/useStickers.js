import { useQuery } from '@tanstack/react-query';

import supabase from '../utils/supabase';
import useAuth from './useAuth';

export default function useStickers() {
  const { getUser } = useAuth();

  const user = getUser();

  async function getStickers() {
    const { data, error } = await supabase.from('stickers').select().eq('user_id', user.id);
    if (error) {
      throw new Error(error);
    }
    return data;
  }

  return useQuery({ queryKey: ['stickers'], queryFn: getStickers });
}
