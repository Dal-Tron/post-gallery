import React, { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from '@/components/feature/Layout'

const LazyGallery = lazy(() => import('../components/feature/Gallery'))
const LazyPostDetails = lazy(() => import('../components/feature/PostDetails'))

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LazyGallery />} />
        <Route path="/post/:id" element={<LazyPostDetails />} />
      </Route>
    </Routes>
  )
}

export default Router
