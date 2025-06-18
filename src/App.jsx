import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Navbar from './components/navbar';
import Home from './components/home';
import Paste from './components/paste';
import ViewPastes from './components/viewPastes';


const router = createBrowserRouter(

  [
    {
      path: "/",
      element: 
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path: "/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path: "/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPastes/>
      </div>
    }
  ]
);

function App() {

  return (
   <div>
      <RouterProvider router={router}/>
   </div>
  )
}

export default App;
