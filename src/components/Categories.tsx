import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { addProductToCart } from "../services/cartService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import {
  deleteProduct,
  getProductsCategory,
} from "../services/productsService";
import { getIsAdmin } from "../services/userService";

interface CategoriesProps {
  productName?: string;
  fromReadOneProduct?: boolean;
}

const Categories: FunctionComponent<CategoriesProps> = ({
  productName,
  fromReadOneProduct,
}) => {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const { category } = useParams();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    getProductsCategory(category as string)
      .then((result) => setCategoryProducts(result.data))
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
  const handleReadOneProduct = (product: Product) => {
    navigate(`/storContainer/categories/${category}/read/${product._id}`);
    window.location.reload();
  };

  const [valueFormInputSearchForProduct, setValueFormInputSearchForProduct] =
    useState<string>("");

  let afterFilter: Product[] = categoryProducts.filter((product: Product) => {
    return product.name
      ?.toLowerCase()
      .includes(valueFormInputSearchForProduct.toLowerCase());
  });

  return (
    <>
      {fromReadOneProduct ? (
        <p className="text-center m-5 pStyle fs-3">
          Other products that may interest you
        </p>
      ) : (
        <div>
          <h1 className="hToo text-center">{category}</h1>
          <div className="d-flex justify-content-around flex-wrap p-5">
            <div className="input-group mb-3 search">
              <input
                type="text"
                className="form-control"
                value={value}
                placeholder="Up to what price?"
                aria-label="Recipient's username"
                aria-describedby="button-addon1"
                onChange={(e) => setValue(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon1"
              >
                Search
              </button>
            </div>

            <div>
              <Link to={`/storContainer`} className="text-black">
                <p>Go bake</p>
              </Link>
            </div>

            <div className="input-group mb-3 search">
              <input
                type="text"
                className="form-control"
                value={valueFormInputSearchForProduct}
                placeholder="search for product"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                onChange={(e) =>
                  setValueFormInputSearchForProduct(e.target.value)
                }
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-around flex-wrap p-5">
        {afterFilter.length ? (
          afterFilter.map((product: Product) =>
            product.name !== productName ? (
              +value > 0 ? (
                product.salePrice <= +value ? (
                  <div
                    key={product._id}
                    className="card col-md-3 m-5 borderCard cardStyle"
                    style={{ width: "18rem" }}
                  >
                    {product.isItOnSale ? (
                      <p className="saleStyle">Sale</p>
                    ) : null}
                    <img
                      src={product.image}
                      className="card-img-top m-1 p-2 pt-4 borderB"
                      alt={product.description}
                    />
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
                          <h1 className="fs-3">
                            {product.salePrice as number}$
                          </h1>
                        </div>
                      ) : (
                        <h1 className="fs-3">{product.salePrice as number}$</h1>
                      )}
                      <div>
                        {product.quantity! <= 0 ? (
                          <p className="quantityStyle">
                            The product is out of stock
                          </p>
                        ) : null}
                      </div>
                      {getIsAdmin() ? (
                        <div>
                          <p> quantity:{product.quantity}</p>
                          <div className="d-flex">
                            <Link to={`edit/${product._id}`}>
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
                        <div
                          onClick={() => handleAddToCart(product)}
                          className="myButton rounded-pill text-center"
                        >
                          Add to cart
                        </div>
                      )}
                    </div>
                  </div>
                ) : null
              ) : (
                <div
                  key={product._id}
                  className="card col-md-3  m-5 borderCard"
                  style={{ width: "18rem" }}
                >
                  {product.isItOnSale ? (
                    <p className="saleStyle">Sale</p>
                  ) : null}
                  <img
                    src={product.image}
                    className="card-img-top m-1 p-2 pt-4 borderB"
                    alt={product.description}
                  />
                  <div className="card-body">
                    <div
                      onClick={() => handleReadOneProduct(product)}
                      className="cursor text-danger"
                    >
                      {product.name}
                    </div>

                    <p className="card-text">{product.description}</p>
                    {product.isItOnSale ?( <div className="d-flex justify-content-around">
                    <del>{product.price}$</del><h1 className="fs-3">{product.salePrice as number}$</h1>
                  </div>):(<h1 className="fs-3">{product.salePrice as number}$</h1>)}
                    <div>
                      {product.quantity! <= 0 ? (
                        <p className="quantityStyle">
                          The product is out of stock
                        </p>
                      ) : null}
                    </div>
                    {getIsAdmin() ? (
                      <div>
                        <p> quantity:{product.quantity}</p>
                        <div className="d-flex">
                          <Link to={`edit/${product._id}`}>
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
                        disabled={product.quantity! <= 0}
                        onClick={() => handleAddToCart(product)}
                        className="myButton rounded-pill text-center"
                      >
                        Add to cart
                      </button>
                    )}
                  </div>
                </div>
              )
            ) : null
          )
        ) : (
          <p>no products</p>
        )}
      </div>
    </>
  );
};

export default Categories;
