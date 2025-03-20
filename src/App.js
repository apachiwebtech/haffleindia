import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import DashBoard from './Component/DashBoard';
import { App } from '@capacitor/app';
import Login from './Component/Login';
import Processing from './Component/Processing';
import { Geolocation } from '@capacitor/geolocation';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Loader from './Component/Loader';
import Thankyou from './Component/Thankyou';
const Routing = createBrowserRouter([
  {
    path: "/",
    element: <MobApp />,
    children: [
      {
        path: '/log',
        element: <Login />
      },
      {
        path: '/',
        element: <DashBoard />
      },
      {
        path: '/process',
        element: <Processing />
      },
      {
        path: '/thankyou',
        element: <Thankyou />
      }
    ]
  }
])


const printCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();

  console.log('Current position lat:', coordinates.coords.latitude);
  console.log('Current position long:', coordinates.coords.longitude);

  localStorage.setItem('currlat', coordinates.coords.latitude);
  localStorage.setItem('currlon', coordinates.coords.longitude);

};

function checkLocalStorageAndRedirect(navigate) {
  const BoxCount = localStorage.getItem('BoxCount');
  if (BoxCount == null) {
    navigate('/log'); // Redirect to dashboard if id exists in localStorage
  }
}


function MobApp() {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)

  useEffect(() => {

    App.addListener('backButton', data => {
      console.log('Restored state:', data);

      if (window.location.pathname === '/') {
        console.log('dont go back')
      }
      else if (window.location.pathname === '/log') {
        console.log('dont go back')
      }
      else {
        navigate(-1)
      }


    });
    checkLocalStorageAndRedirect(navigate);

    printCurrentPosition()
  }, [navigate])

  setTimeout(() => {
    setLoader(false)
  }, 500);
  return (
    <>
      {loader && <Loader />}
      <Outlet />
    </>

  );
}

export default Routing;
