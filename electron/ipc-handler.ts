   // electron/ipc-handler.ts
import { ipcMain } from "electron";
import { getDB } from "./db";

export function registerIpc(){
    

    ipcMain.handle("get-todolist", () => {
        const db = getDB();
        const stmt = db.prepare("SELECT * FROM todos ORDER BY num DESC");
        return stmt.all();
    });


    // Todo 추가
    ipcMain.handle("add-todo",  (_event, title: string, comment: string, t: string) => {
    const db = getDB();
    const pstmt = db.prepare(`
        INSERT INTO todos (title, comment, t) 
        VALUES (?, ?, ?)
    `);
    const result = pstmt.run(title, comment, t);
    return result.changes > 0; // 성공 여부 반환
    });
};