import Storage from 'node-storage';

// simple file based storage is used for simplicity
// therefore data are not persisted between deployments
// in a real world app, you would use a database
function getDB() {
  return new Storage('./storage.json');
}

export function getFavorites(): Record<string, boolean> {
  const db = getDB();
  try {
    return db.get('favorites') || {};
  } catch {
    return {};
  }
}

type PutFavoriteInput = { id: string; value: boolean };

export function putFavorite({ id, value }: PutFavoriteInput): boolean {
  const db = getDB();
  try {
    db.put(`favorites.${id}`, value);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
