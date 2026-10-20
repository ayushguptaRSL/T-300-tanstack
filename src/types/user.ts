export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: string;
  simulateFailure?: boolean;
}
