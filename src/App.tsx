
import { Route, Routes } from 'react-router-dom'
import TestThree from './views/PointAndBox/index'
import Home from './views/Home'
import BoxAndSphere from './views/BoxAndSphere'
import RotationHeart from './views/RotationHeart'

function App() {

  return (
    <>
      <Home />
      <Routes>
        <Route path='/point-light' element={<TestThree /> }></Route>
        <Route path='/box-and-sphere' element={<BoxAndSphere /> }></Route>
        <Route path='/rotation-heart' element={<RotationHeart /> }></Route>
      </Routes>
    </>
  )
}

export default App
