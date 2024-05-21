import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Gallery from '@/components/feature/Gallary'
import PostDetails from '@/components/feature/PostDetails'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/post/:id" element={<PostDetails />} />
    </Routes>
  )
}

export default Router
