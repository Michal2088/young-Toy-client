import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import ShippingNotice from "./components/ShippingNotice";
import Navbar from "./components/Navbar";
import About from "./components/About";
import StorContainer from "./components/StorContainer";
import Categories from "./components/Categories";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Register from "./components/Register";
import EditProduct from "./components/EditProduct";
import Footer from "./components/Footer";
import NewProduct from "./components/NewProduct";
import UserManagement from "./components/UserManagement";
import ReadOneProduct from "./components/ReadOneProduct";
import MessagesFromUsers from "./components/MessagesFromUsers";


function App() {
  return (
    <div className="container-fluid d-flex flex-column min-vh-100">
      <ToastContainer theme="dark" />
      <ShippingNotice />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/UserManagement"element={<UserManagement /> }></Route>
          <Route path="/MessagesFromUsers"element={<MessagesFromUsers /> }></Route>
          <Route path="/storContainer">
            <Route index element={<StorContainer />} />
            <Route path="newProduct" element={<NewProduct/>}></Route>
            <Route path="categories/:category" element={<Categories/>}></Route>
            <Route path="categories/:category/edit/:id" element={<EditProduct/>}></Route>
            <Route path="categories/:category/read/:id" element={<ReadOneProduct/>}></Route>
          </Route>
        </Routes>
        <div className="mt-auto">
        <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
