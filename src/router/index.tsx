import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Gallery from '@/components/feature/Gallary'
import PostDetails from '@/components/feature/PostDetails'
import Layout from '@/components/feature/Layout'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Gallery />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Route>
    </Routes>
  )
}

export default Router
