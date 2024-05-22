import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  return (
    <div className="flex h-full flex-col">
      <header className="bg-gray-800 p-4 text-white">
        <h1>Post Gallery</h1>
      </header>
      <main className="grow">
        <Outlet />
      </main>
      <footer className="bg-gray-800 p-4 text-white">
        © 2024 Post Gallery
      </footer>
    </div>
  )
}

export default Layout
