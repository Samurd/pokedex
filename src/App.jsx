import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import ProtectedRoutes from './components/ProtectedRoutes'
import { Pokedex } from './pages/Pokedex'
import { PokemonDetail } from './pages/PokemonDetail'

function App() {

  return (
    <HashRouter>
      <Routes>
         <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex />} />
            <Route path='/pokedex/:name' element={<PokemonDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
