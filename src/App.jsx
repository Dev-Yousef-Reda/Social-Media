import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthenticationLayout from './Components/AuthenticationLayout/AuthenticationLayout'
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import AuthorizationContextProvider from './Components/Context/AuthorizationContextProvider/AuthorizationContextProvider';
import ProtectedRouter from './Components/ProtectedRouter/ProtectedRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Bounce, ToastContainer } from 'react-toastify';
import Settings from './Components/Settings/Settings';

const routs = createBrowserRouter([
  {
    path: '', element: <MainLayout />, children: [
      { index: true, element: <ProtectedRouter><Home /> </ProtectedRouter> },
      { path: '/profile', element: <ProtectedRouter> <Profile /></ProtectedRouter> },
      { path: '/settings', element: <ProtectedRouter> <Settings /></ProtectedRouter> },
    ]
  },
  {
    path: '', element: <AuthenticationLayout />, children: [
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ]
  },
])

const queryClient = new QueryClient()

export default function App() {
  return (

    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        draggable
        theme="dark"
        transition={Bounce}
        containerId={`addingComment`}
      />
      <AuthorizationContextProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routs} />
        </QueryClientProvider>
      </AuthorizationContextProvider>
    </>

  )
}
