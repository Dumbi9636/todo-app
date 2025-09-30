import { ipcMain, app, BrowserWindow, globalShortcut } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname$1, "../database/todo.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const require2 = createRequire(import.meta.url);
const Database = require2("better-sqlite3");
let db = null;
function getDB() {
  if (db) return db;
  db = new Database(dbPath);
  db.exec(`
        CREATE TABLE IF NOT EXISTS todos(
            num INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            comment TEXT,
            type TEXT, 
            priority INTEGER DEFAULT 0, -- 0:낮음, 1:보통, 2:높음
            status TEXT DEFAULT 'pending', -- pending, in-progress, done
            rt TEXT DEFAULT (datetime('now','localtime')), -- 등록 시간
            t TEXT, -- 목표 시간
            updatedAt TEXT DEFAULT (datetime('now','localtime')), -- 수정 시간
            reminder INTEGER DEFAULT 0 -- 알림 여부 (0:false, 1:true)
        )
    `);
  return db;
}
function registerIpc() {
  ipcMain.handle("get-todolist", () => {
    const db2 = getDB();
    const stmt = db2.prepare("SELECT * FROM todos ORDER BY num DESC");
    return stmt.all();
  });
  ipcMain.handle("add-todo", (_event, title, comment, t) => {
    const db2 = getDB();
    const pstmt = db2.prepare(`
        INSERT INTO todos (title, comment, t) 
        VALUES (?, ?, ?)
    `);
    const result = pstmt.run(title, comment, t);
    return result.changes > 0;
  });
}
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  getDB();
  createWindow();
  registerIpc();
});
app.on("browser-window-focus", () => {
  globalShortcut.register("Control+t", () => {
    win == null ? void 0 : win.webContents.openDevTools();
  });
});
app.on("browser-window-blur", () => {
  globalShortcut.unregisterAll();
});
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
