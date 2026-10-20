import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../api/users';
import type { CreateUserInput } from '../types/user';

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newUserData: CreateUserInput) => createUser(newUserData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
