import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/users';
import type { User } from '../types/user';

export interface DeleteUserVariables {
  userId: number;
  simulateFailure?: boolean;
}

interface DeleteUserContext {
  previousUsers?: User[];
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, DeleteUserVariables, DeleteUserContext>({
    mutationFn: ({ userId, simulateFailure }) => deleteUser(userId, simulateFailure),

    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries({ queryKey: ['users'] });

      const previousUsers = queryClient.getQueryData<User[]>(['users']);

      queryClient.setQueryData<User[]>(['users'], (old = []) =>
        old.filter((user) => user.id !== userId)
      );

      return { previousUsers };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers);
      }
    },

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
