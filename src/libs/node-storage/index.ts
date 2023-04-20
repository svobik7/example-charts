import Storage from 'node-storage';

// simple in-memory storage is used for testing purposes
const localStorage = {
  favorites: {} as Record<string, boolean>,
  put: (id: string, value: boolean) => {
    localStorage.favorites[id] = value;
  },
  get: () => {
    return localStorage.favorites;
  },
};

// simple file based storage is used for simplicity
// therefore data are not persisted between deployments
// in a real world app, you would use a database
function getStorage() {
  // in development mode, we use localStorage
  // and not persist data between requests
  if (process.env.NODE_ENV === 'development') {
    return localStorage;
  }

  // in production mode, we use file based storage
  // and persist data between requests
  return new Storage('./storage.json');
}

export function getFavorites(): Record<string, boolean> {
  const storage = getStorage();
  try {
    return storage.get('favorites') || {};
  } catch {
    return {};
  }
}

type PutFavoriteInput = { id: string; value: boolean };

export function putFavorite({ id, value }: PutFavoriteInput): boolean {
  const storage = getStorage();
  try {
    storage.put(`favorites.${id}`, value);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
