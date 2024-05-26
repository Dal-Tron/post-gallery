import { lazy, Suspense, useState, useEffect, startTransition, FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from '@/components/feature/Layout'
import { BounceLoading } from '@/components/base/BounceLoading'

const FullBounce = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <BounceLoading />
    </div>
  )
}

const LazyGallery = lazy(() => import('../components/feature/Gallery'))
const LazyPostDetails = lazy(() => import('../components/feature/PostDetails'))

const Router: FC = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    startTransition(() => {
      setReady(true)
    })
  }, [])

  if (!ready) {
    return <FullBounce />
  }

  return (
    <Suspense fallback={<FullBounce />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LazyGallery />} />
          <Route path="post/:id" element={<LazyPostDetails />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default Router
