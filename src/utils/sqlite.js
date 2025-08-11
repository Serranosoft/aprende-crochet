import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

let db;

export async function getDb() {
    if (!db) {
        db = await SQLite.openDatabaseAsync("crochet");
    }
    return db;
}

export async function initDb() {
    const db = await getDb();

    await db.execAsync('PRAGMA foreign_keys = ON');
    await db.execAsync(`CREATE TABLE IF NOT EXISTS my_progress (id TEXT, pattern_id TEXT, progress TEXT, isLastPattern INTEGER);`);
}

export async function getLastPattern() {
    const db = await getDb();
    const x = await db.getAllAsync("SELECT * FROM my_progress WHERE isLastPattern = ?", 1);
    return x[0];
}
export async function getProgressFromPattern(pattern_id) {
    const db = await getDb();
    const x = await db.getFirstAsync("SELECT progress FROM my_progress WHERE pattern_id = ?", pattern_id);
    return x;
}

export async function addNewProgress(pattern_id, progress) {
    const db = await getDb();
    const id = uuid.v4();
    db.runAsync("INSERT into my_progress (id, pattern_id, progress, isLastPattern) VALUES (?,?,?,?)", id, pattern_id, progress, 1);
}
export async function updateProgress(pattern_id, progress) {
    const db = await getDb();
    db.runAsync("UPDATE my_progress SET progress = ? WHERE pattern_id = ?", progress, pattern_id);
}