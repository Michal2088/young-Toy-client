import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { addProductToCart } from "../services/cartService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { deleteProduct, getProduct } from "../services/productsService";
import { getIsAdmin } from "../services/userService";

import Categories from "./Categories";

interface ReadOneProductProps {}

const ReadOneProduct: FunctionComponent<ReadOneProductProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: " ",
    quantity: 0,
    category: "",
    image: "",
    isItOnSale: false,
    salePrice: 0,
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    getProduct(id as string)
      .then((result) => setProduct(result.data))
      .catch((err) => console.log(err));
  }, [isChanged]);

  const handleAddToCart = (product: Product) => {
    if (localStorage.getItem("token")) {
      addProductToCart(product)
        .then(() => {
          successMsg(`${product.name} add to your cart successfully`);
          setIsChanged(!isChanged);
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
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 p-5">
            <h1 className="text-center hToo">{product.name}</h1>

            <div className="card mb-3" key={id}>
              {product.isItOnSale ? <p className="saleStyle">Sale</p> : null}
              <img
                src={product.image}
                className="card-img-top m-1 p-2 pt-4 borderB"
                alt={product.description}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
                {product.isItOnSale ?( <div className="d-flex justify-content-around">
                    <del>{product.price}$</del><h1 className="fs-3">{product.salePrice as number}$</h1>
                  </div>):(<h1 className="fs-3">{product.salePrice as number}$</h1>)}
               
                <div>
                  {product.quantity! <= 0 ? (
                    <p className="quantityStyle">product over</p>
                  ) : (
                  null
                  )}
                </div>
                {getIsAdmin() ? (
                  <div className="d-flex">
                    <Link
                      to={`/storContainer/categories/${product.category}/edit/${id}`}
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
                ) : (
                  <button
                    disabled={product.quantity! <= 0}
                    onClick={() => handleAddToCart(product)}
                    className="myButton rounded-pill text-center"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <Categories
              productName={product.name}
              fromReadOneProduct={true}
            ></Categories>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReadOneProduct;
