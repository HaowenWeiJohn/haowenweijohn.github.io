import { Routes, Route } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import Home from '@/pages/Home'
import Publications from '@/pages/Publications'
import Music from '@/pages/Music'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/music" element={<Music />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
