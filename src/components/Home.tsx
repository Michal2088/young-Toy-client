import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { addProductToCart } from "../services/cartService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { deleteProduct, getProductsOnSale } from "../services/productsService";
import { getIsAdmin } from "../services/userService";

import Carrousel from "./Carrousel";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [productsOnSale, setproductsOnSale] = useState<Product[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    getProductsOnSale()
      .then((result: any) => {
        setproductsOnSale(result.data);
      })
      .catch((err: any) => console.log(err));
  }, [isChanged]);
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    if (localStorage.getItem("token")) {
      addProductToCart(product)
        .then(() => {
          successMsg(`${product.name} add to your cart successfully`);
        })
        .catch((err) => {
          errorMsg(err.response.data);
        });
    } else {
      navigate("/login");
    }
  };

  const handleDelete = (product: Product) => {
    if (window.confirm("Are you sure?")) {
      deleteProduct(product._id as string)
        .then(() => {
          successMsg(`${product.name} deleted successfully`);
          setIsChanged(!isChanged);
        })
        .catch((err) => {
          errorMsg(err.response.data);
        });
    }
  };
  const handleReadOneProduct = (product: Product) => {
    navigate(
      `/storContainer/categories/${product.category}/read/${product._id}`
    );
    window.location.reload();
  };
  return (
    <>
      <div className="d-none d-xl-block">
        <Carrousel />
        <h1 className="headerColor text-center">s-a-l-e-!-! </h1>
      </div>

      <div className="d-block d-xl-none">
        <img src="images/005-sm.png" alt="" className="SmallScreenImage" />
        <h1 className="text-center m-5 text-info">s-a-l-e-!-! </h1>
      </div>

      <div className="text-center">
        <i className="fa-solid fa-stars"></i>
        <div className="d-flex justify-content-around flex-wrap p-5 text-bg-info">
          {productsOnSale.length ? (
            productsOnSale.map((product: Product) => (
              <div
                key={product._id}
                className="card col-md-3 m-5 borderCard cardStyle"
                style={{ width: "18rem" }}
              >
                {product.isItOnSale ? <p className="saleStyle">Sale</p> : null}
                <img
                  src={product.image}
                  className="card-img-top m-1 p-2 pt-4 borderB"
                  alt={product.description}
                />
                {product.quantity! <= 0 ? (
                  <p className="quantityStyle">The product is out of stock</p>
                ) : null}
                <div className="card-body">
                  <div
                    onClick={() => handleReadOneProduct(product)}
                    className="cursor text-danger"
                  >
                    {product.name}
                  </div>
                  <p className="card-text">{product.description}</p>
                  {product.isItOnSale ? (
                    <div className="d-flex justify-content-around">
                      <del>{product.price}$</del>
                      <h1 className="fs-3">{product.salePrice as number}$</h1>
                    </div>
                  ) : (
                    <h1 className="fs-3">{product.salePrice as number}$</h1>
                  )}
                  {getIsAdmin() ? (
                    <div>
                      <p> quantity:{product.quantity}</p>
                      <div className="d-flex">
                        <Link
                          to={`/storContainer/categories/:category/edit/${product._id}`}
                        >
                          <i className="fa-solid fa-pen-to-square m-1"></i>
                        </Link>
                        <div
                          onClick={() => handleDelete(product)}
                          className="text-danger"
                        >
                          <i className="fa-solid fa-trash m-1"></i>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="text-danger myButton rounded-pill"
                      disabled={product.quantity! <= 0}
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>There are no products at this price</p>
          )}
        </div>
        <div className="mt-auto"></div>
      </div>
    </>
  );
};

export default Home;
