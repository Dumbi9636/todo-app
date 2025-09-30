import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('api', {
  getTodoList: () => ipcRenderer.invoke("get-todolist"),
  addTodo: (title: string, comment:string, t:string) => ipcRenderer.invoke("add-todo", title, comment, t),
  toggleTodo: (num: number) => ipcRenderer.invoke("toggle-todo", num),
});
