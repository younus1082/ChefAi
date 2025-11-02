import fs from 'fs';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'users.json');

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

// Initialize users file if it doesn't exist
function initUsersFile() {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
}

export function getUsers(): User[] {
  initUsersFile();
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

export function saveUsers(users: User[]): void {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error saving users file:', error);
    throw error;
  }
}

export function findUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

export function createUser(userData: Omit<User, '_id'>): User {
  const users = getUsers();
  const newUser: User = {
    _id: Date.now().toString(),
    ...userData
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}