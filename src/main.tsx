import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Components/Home'
import Clipboard from './Components/Clipboard'
import AlterDialog from './Components/AlertDialog'
import ThemeToggler from './Components/ThemeToggler'
import Toast from './Components/Toast'
import Counter from './Components/Counter'
import GenericListViewPage from './Components/GenericListViewPage'


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route path='' element={<Home/>}/>
    <Route path='/copy-to-clipboard' element={<Clipboard/>}/>
    <Route path='/alert-dialog' element={<AlterDialog/>}/>
    <Route path='/theme-toggler' element={<ThemeToggler/>}/>
    <Route path='/toast' element={<Toast/>}/>
    <Route path='/counter' element={<Counter/>}/>
    <Route path='/generic-list-view' element={<GenericListViewPage/>}/>
  </Route>
))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
