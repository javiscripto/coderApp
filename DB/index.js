import * as SQLite from 'expo-sqlite'

let db = null

export const init = async () => {
  db = await SQLite.openDatabaseAsync('sessions.db')
  await db.execAsync(
    'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL)'
  )
}

export const insertSession = async ({ email, localId, token }) => {
  try {
    await db.runAsync(
      'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?)',
      localId,
      email,
      token
    )
  } catch (error) {
    console.error('Error insertando sesión:', error)
  }
}

export const deleteSession = async () => {
  try {
    await db.runAsync('DELETE FROM sessions')
  } catch (error) {
    console.error('Error eliminando sesión:', error)
  }
}

export const fetchSession = async () => {
  const firstRow = await db.getFirstAsync('SELECT * FROM sessions')
  return firstRow
}