import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supabase } from "../utils/supabase";
import { getUser } from "../utils/user";

export default function useSaveSticker() {
  const queryClient = useQueryClient();
  const user = getUser();

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post("/todos", newTodo);
    },
  });
  async function saveSticker(code) {
    const { data, error } = await supabase
      .from("stickers")
      .insert({ code, user_id: user.id });
    if (error) {
      throw new Error(error);
    }
    await queryClient.invalidateQueries(["stickers"]);
  }

  return useMutation({ mutationFn: saveSticker });
}
