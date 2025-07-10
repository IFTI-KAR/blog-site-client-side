import React from 'react'
import { RouterProvider } from 'react-router'
import router from './router/router'

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
