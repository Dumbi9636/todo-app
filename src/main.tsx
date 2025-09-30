import React from 'react'
import ReactDOM from 'react-dom/client'
// SPA 를 구현하기 위한 RouterProvider 를 import
import { RouterProvider } from 'react-router-dom'
// routing 정보를 담고 있는 router import
import router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
