import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/users';
import type { User } from '../types/user';

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 30 * 1000,
  });
}
