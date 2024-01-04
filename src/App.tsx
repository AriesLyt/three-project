
import { Route, Routes } from 'react-router-dom'
import TestThree from './views/PointAndBox/index'
import Home from './views/Home'

function App() {

  return (
    <>
      <Home />
      <Routes>
        <Route path='/point-light' element={<TestThree /> }></Route>
      </Routes>
    </>
  )
}

export default App
