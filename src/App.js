import { Component } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { Offline } from 'react-detect-offline';
import './App.css';
import "./sb-admin-2.min.css";
import "@fortawesome/fontawesome-free";
import Productlist from './ProductList';
import Dashboard from './Dashboard';
import Userlist from './Userlist';
import UserView from './UserView';
import Portal from './Portal';
import Login from './Login';
import Orderlist from './orderList';
import ProductCreate from './ProductCreate';
import ProductView from './ProductView';
import ProductEdit from './ProductEdit';
import OrderView from './orderView';
import NurseCreate from './NurseCreate';
import Nurselist from './NuresList';
import NurseEdit from './NurseEdit';
import NurseView from './NurseView';
import ReservationView from './NurseReservView';
import Reservationlist from './NurseReservList';
import { AuthProvider } from './authContext';

const router = createBrowserRouter([
  {

    path: '', element: <Portal />, children: [
      { index: true, element: <Login /> },
      // { index: true, element: <Dashboard /> },
      { path:"dashboard", element: <Dashboard /> },
      { path: 'user-list', element: <Userlist /> },
      { path: 'orderlist', element: <Orderlist /> },
      { path: 'user-view/:id', element: <UserView /> },
      { path: 'product-list', element: <Productlist /> },
      { path: 'create-product', element: <ProductCreate /> },
      { path: 'product-view/:id', element: <ProductView /> },
      { path: 'product-edit/:id', element: <ProductEdit /> },
      { path: 'order-view/:id', element: <OrderView /> },
      { path: 'nurse-create', element: <NurseCreate /> },
      { path: 'nurselist', element: <Nurselist /> },
      { path: 'nurse-edit/:id', element: <NurseEdit /> },
      { path: 'nurse-view/:id', element: <NurseView /> },
      { path: 'reservation-view/:id', element: <ReservationView /> },
      { path: 'reservationlist', element: <Reservationlist /> }
    ]

  }
]);

export default class App extends Component {
  state = {}

  render() {
    let queryClient = new QueryClient();

    return (
      <>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster />
          </AuthProvider>

        </QueryClientProvider>
        <Offline>
          <div className="bg-dark position-fixed text-white bottom-0 start-0 p-3 rounded-3">
            Ooops.... You Are Offline
          </div>
        </Offline>
      </>
    );
  }
}
