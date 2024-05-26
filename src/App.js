import './App.css';
import "./sb-admin-2.min.css";
import "@fortawesome/fontawesome-free"
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Userlist from './Userlist';
import Portal from './Portal';
import UserCreate from './UserCreate';
import UserView from './UserView';
import UserEdit from './UserEdit';
import Productlist from './ProductList';
import ProductCreate from './ProductCreate';
import ProductView from './ProductView';
import ProductEdit from './ProductEdit';
import Orderlist from './orderList';
import OrderView from './orderView';
import NurseCreate from './NurseCreate';
import Nurselist from './NuresList';
import NurseEdit from './NurseEdit';
import NurseView from './NurseView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/portal' element={<Portal />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='user-list' element={<Userlist />} />
          <Route path=' Orderlist' element={< Orderlist/>}/>
          <Route path='create-user' element={<UserCreate />} />
          <Route path='user-view/:id' element={<UserView />} />
          <Route path='user-edit/:id' element={<UserEdit />} />
          <Route path='product-list' element={<Productlist />} />
          <Route path='create-product' element={<ProductCreate />} />
          <Route path='product-view/:id' element={<ProductView />} />
          <Route path='product-edit/:id' element={<ProductEdit />} />
          <Route path='OrderView/:id' element={<OrderView/>}/>
          <Route path='NurseCreate' element={<NurseCreate/>}/>
          <Route path='Nurselist' element={<Nurselist/>}/>
          <Route path='NurseEdit/:id' element={<NurseEdit/>}/>
          <Route path='NurseView/:id' element={<NurseView/>}/>







        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
