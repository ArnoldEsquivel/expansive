import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Backdrop from './components/Backdrop'

const Home = React.lazy(() => import('./pages/Home'))
const Locations = React.lazy(() => import('./pages/Locations'))
const Admin = React.lazy(() => import('./pages/Admin'))

export default function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<Backdrop />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
