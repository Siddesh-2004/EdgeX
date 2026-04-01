import React from 'react'
import Landing from './pages/Landing'
import AddProblems from './pages/AddProblems'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import ProblemPage from './pages/ProblemPage'
function App() {
  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route path='' element={<Landing />} />
      <Route path='addProblems' element={<AddProblems />} />
      <Route path='problems/:id' element={<ProblemPage />} />
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default App