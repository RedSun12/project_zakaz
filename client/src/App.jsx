import './App.css';
import Root from './Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SigninPage from './pages/SigninPage/SigninPage';
import SignupPage from './pages/SignupPage/SignupPage';
import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from './axiosInstance';
import Favorities from './components/Favorities/Favorities';
import InfoCard from './components/InfoCard/InfoCard';

function App() {
  const [user, setUser] = useState();
  const [cook, setCook] = useState({});



  useEffect(() => {
    axiosInstance(`${import.meta.env.VITE_API}/tokens/refresh`).then((res) => {
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
    });
  }, []);




  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root user={user} setUser={setUser} />,
      children: [
        {
          path: '/',
          element: <HomePage user={user} cook={cook} setCook={setCook}/>,
        },
        {
          path: '/signin',
          element: <SigninPage setUser={setUser} />,
        },
        {
          path: '/signup',
          element: <SignupPage setUser={setUser} />,
        },
        {
          path: '/favorities',
          element: <Favorities user={user} setUser={setUser} />,
        },
        {
          path: '/recepts/:id',
          element: <InfoCard user={user} setUser={setUser} cook={cook} setCook={setCook}/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
