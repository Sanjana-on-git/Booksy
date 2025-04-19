// Local storage configuration for authentication
// This replaces the Firebase configuration with local storage

export const AUTH_STORAGE_KEY = 'booksy_auth';
export const USERS_STORAGE_KEY = 'booksy_users';

// Initialize local storage with empty users array if not exists
if (!localStorage.getItem(USERS_STORAGE_KEY)) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
}

console.log('Local storage authentication configured');