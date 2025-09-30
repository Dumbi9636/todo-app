// electron/db.ts


/*
    npm install better-sqlite3
    npm i -D @types/better-sqlite3

    위의 2개 dependency 를 설치하면 sqlite db 를 typescript 로 사용할수 있다.

    현재 사용하는 node 버전에 맞게 rebuild 하기 

    npm install -D electron-rebuild
    npx electron-rebuild
*/
import path from 'node:path';
import { fileURLToPath } from "node:url";
import fs from 'node:fs';
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// db 파일의 위치와 파일명 설정 
const dbPath = path.join(__dirname, '../database/todo.db')
// 해당 폴더와 파일이 만들어 지도록 한다 
fs.mkdirSync(path.dirname(dbPath), { recursive: true })
//DataBase 객체를 담을 변수 선언 

// ESM(ES 모듈) 환경에서도 CommonJS 모듈을 불러올 수 있도록 require 생성
const require = createRequire(import.meta.url);
// better-sqlite3 모듈을 CJS 방식으로 로드하고,
// 타입은 TS가 알 수 있도록 'typeof import("better-sqlite3")'로 단언
const Database = require("better-sqlite3") as typeof import("better-sqlite3");
// DB 커넥션 객체를 저장할 변수 (초기값은 null, 나중에 Database 인스턴스 할당 예정)
let db: import("better-sqlite3").Database | null = null;

export function getDB(){
    //초기화를 한번만 하도록 db 객체가 생성되어 있으면 기존 db 객체를 리턴해준다.
    if(db)return db;
    // DataBase 객체 생성  
    db= new Database(dbPath);
    // Table 생성 
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