"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  getTodoList: () => electron.ipcRenderer.invoke("get-todolist"),
  addTodo: (title, comment, t) => electron.ipcRenderer.invoke("add-todo", title, comment, t),
  toggleTodo: (num) => electron.ipcRenderer.invoke("toggle-todo", num)
});
