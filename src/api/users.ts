import type { User, CreateUserInput } from '../types/user';

interface RawDummyUser {
  id: number;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  role?: string;
}

interface RawDummyUsersResponse {
  users: RawDummyUser[];
}

const localCreatedUsers: User[] = [];
const deletedUserIds = new Set<number>();

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch('https://dummyjson.com/users?limit=2&select=firstName,lastName,email,role');
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }
  const data = (await response.json()) as RawDummyUsersResponse;
  const serverUsers: User[] = data.users.map((u) => ({
    id: u.id,
    name: u.name || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'Anonymous User',
    email: u.email,
    role: u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1) : 'User',
  }));

  const allUsers = [...localCreatedUsers, ...serverUsers];
  return allUsers.filter((u) => !deletedUserIds.has(u.id));
}

export async function createUser(input: CreateUserInput): Promise<User> {
  if (input.simulateFailure) {
    // Short delay so the pending state is visible before failing
    await new Promise((resolve) => setTimeout(resolve, 600));
    throw new Error('Simulated network error: Unable to create user.');
  }

  const [firstName, ...rest] = input.name.trim().split(' ');
  const lastName = rest.join(' ');

  const response = await fetch('https://dummyjson.com/users/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email: input.email.trim(),
      role: input.role.toLowerCase(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as RawDummyUser;

  const newUser: User = {
    id: data.id || Date.now(),
    name: input.name.trim(),
    email: input.email.trim(),
    role: input.role,
  };

  localCreatedUsers.unshift(newUser);
  return newUser;
}

export async function deleteUser(
  userId: number,
  simulateFailure: boolean = false
): Promise<{ id: number; isDeleted: boolean }> {
  if (simulateFailure) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    throw new Error('Simulated network error: Failed to delete user from server.');
  }

  const isLocalUser = localCreatedUsers.some((u) => u.id === userId) || userId > 208;

  if (isLocalUser) {
    await new Promise((resolve) => setTimeout(resolve, 350));

    deletedUserIds.add(userId);
    const localIndex = localCreatedUsers.findIndex((u) => u.id === userId);
    if (localIndex !== -1) {
      localCreatedUsers.splice(localIndex, 1);
    }

    return { id: userId, isDeleted: true };
  }

  const response = await fetch(`https://dummyjson.com/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    if (response.status === 404) {
      deletedUserIds.add(userId);
      return { id: userId, isDeleted: true };
    }
    throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
  }

  deletedUserIds.add(userId);
  return response.json() as Promise<{ id: number; isDeleted: boolean }>;
}
