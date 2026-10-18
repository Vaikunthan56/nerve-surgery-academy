import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Player from './pages/Player'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/module/:id" element={<Player />} />
    </Routes>
  )
}
