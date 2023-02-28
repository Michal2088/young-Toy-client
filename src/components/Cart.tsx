import { FunctionComponent, useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { deleteProductFromCart, ProductInCart } from "../services/cartService";
import { errorMsg, successMsg } from "../services/feedbacksService";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  useEffect(() => {
    ProductInCart()
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => console.log(err));
  }, [isChanged]);
  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure?")) {
      deleteProductFromCart(index)
        .then(() => {
          successMsg("${product.name} deleted successfully");
          setIsChanged(!isChanged);
        })
        .catch((err) => {
          console.log(err.response.data);
          errorMsg(err.response.data);
        });
    }
  };

  let sum: number = 0;
  for (const product of products) {
    sum += product.price;
  }
  return (
    <>
      <div className="d-none d-md-block">
        <h1 className="headerColor text-center">your cart</h1>
      </div>
      <div className="d-block d-md-none">
        <h1 className="hToo text-center m-5">your cart</h1>
      </div>

      <div className="container">
        <div className="d-flex justify-content-around flex-wrap text-center">
          {products.length ? (
            products.map((product: Product) => (
              <div
                key={product._id}
                className="card col-md-3 mb-5 cardStyle"
                style={{ width: "18rem" }}
              >
                {product.isItOnSale ? <p className="saleStyle">Sale</p> : null}
                <img src={product.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p> {product.description}</p>
                  <div className="d-flex justify-content-around">
                    <del>{product.price}$</del><b>{product.salePrice as number}$</b>
                  </div>
                  <div
                    className="myButton rounded-pill text-center"
                    onClick={() => handleDelete(products.indexOf(product))}
                  >
                    delete
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>your cart is empty</p>
          )}
        </div>
      </div>

      <h1 className="mx-auto marginTop hToo">Total payment:{sum}</h1>
    </>
  );
};

export default Cart;
