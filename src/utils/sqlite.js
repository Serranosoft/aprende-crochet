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
    await db.execAsync(`DROP TABLE IF EXISTS my_progress`);
    await db.execAsync(`DROP TABLE IF EXISTS last_pattern`);
    await db.execAsync(`DROP TABLE IF EXISTS counters`);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS my_progress (id TEXT, pattern_id TEXT, progress TEXT);`);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS last_pattern (id TEXT PRIMARY KEY, pattern_id TEXT);`);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS counters (id TEXT PRIMARY KEY, pattern_id TEXT, progress TEXT);`);
}

export async function getLastPattern() {
    const db = await getDb();
    const x = await db.getAllAsync("SELECT pattern_id FROM last_pattern");
    return x[0].pattern_id;
}
export async function getProgressFromPattern(pattern_id) {
    const db = await getDb();
    const x = await db.getFirstAsync("SELECT progress FROM my_progress WHERE pattern_id = ?", pattern_id);
    return x;
}

export async function getPatternsInProgress() {
    const db = await getDb();
    const x = await db.getAllAsync("SELECT COUNT(*) as count FROM my_progress WHERE progress > 0");
    return x[0].count;
}

// Gestiona si debe añadir un nuevo progreso o si debe actualizar el último patrón visto
export async function handleProgress(pattern_id, progress) {
    const db = await getDb();
    const patterns = await db.getAllAsync("SELECT * from my_progress");

    // Si existe entonces actualizar el progreso del patrón con el paso recibido. Si es exactamente igual entonces no cambia nada.
    if (patterns.some((el) => el.pattern_id === pattern_id)) {
        updateLastPattern(pattern_id);
        // Si el patrón ya existia pero su progreso es distinto, debo actualizar su progreso.
        if (patterns.some((el) => el.progress !== progress)) {
            updateProgress(pattern_id, progress);
        }
        // En caso de no existir, añadir nuevo progreso.
    } else {
        addNewProgress(pattern_id, progress);
        updateLastPattern(pattern_id);
    }
}


export async function addNewProgress(pattern_id, progress) {
    const db = await getDb();
    const id = uuid.v4();
    db.runAsync("INSERT into my_progress (id, pattern_id, progress) VALUES (?,?,?)", id, pattern_id, progress);
}

export async function updateLastPattern(pattern_id) {
    const db = await getDb();

    const lastPattern = await db.getAllAsync("SELECT id FROM last_pattern LIMIT 1");
    const id = lastPattern.length > 0 ? lastPattern[0].id : uuid.v4();

    await db.runAsync("INSERT OR REPLACE INTO last_pattern (id, pattern_id) VALUES (?, ?)", id, pattern_id);
}

export async function updateProgress(pattern_id, progress) {
    const db = await getDb();
    db.runAsync("UPDATE my_progress SET progress = ? WHERE pattern_id = ?", progress, pattern_id);
}

export async function handleCounter(pattern_id) {
    const db = await getDb();
    const id = uuid.v4();
    const counters = await db.getAllAsync("SELECT * from counters");
    if (counters.some((el) => el.pattern_id === pattern_id)) {
        return counters[0].progress;
    } else {
        db.runAsync("INSERT INTO counters (id, pattern_id, progress) VALUES (?,?,?)", id, pattern_id, 0);
        return 0;
    }
}

export async function updateCounter(pattern_id, progress) {
    const db = await getDb();
    db.runAsync("UPDATE counters SET progress = ? WHERE pattern_id = ?", progress, pattern_id);
}