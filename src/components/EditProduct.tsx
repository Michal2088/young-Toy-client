import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editProduct, getProduct } from "../services/productsService";
import { Product } from "../interfaces/Product";

interface EditProductProps {}

const EditProduct: FunctionComponent<EditProductProps> = () => {
  const { id } = useParams();

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
    window.scrollTo(0, 0)
    getProduct(id as string)
      .then((result) => setProduct(result.data))
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      category: product.category,
      image: product.image,
      isItOnSale: product.isItOnSale,
      salePrice: product.salePrice,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required().min(2).max(1024).trim(),
      price: Yup.number().required(),
      description: Yup.string().required().min(2).max(1024).trim(),
      quantity: Yup.number().required(),
      category: Yup.string().required().min(2).trim(),
      image: Yup.string().required().trim(),
      isItOnSale: Yup.boolean().required(),
      salePrice: Yup.number(),
    }),
    onSubmit: (values: Product, { resetForm }) => {
      let product = { ...values, _id: id as string };
      editProduct(product)
        .then((result) => {
          successMsg("product edit successfully");
          navigate(-1);
        })
        .catch((err) => {
          errorMsg(err.response.data);
          resetForm();
        });
    },
  });
  return (
    <>
      <div className="container d-flex flex-column min-vh-100">
        <form onSubmit={formik.handleSubmit} className="m-5 w-50 mx-auto">
          <h3 className="text-center display-5">Edit Product</h3>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingEmail">name</label>
          </div>
          {formik.touched.name && formik.errors.name ? (
            <p className="text-danger">{formik.errors.name}</p>
          ) : null}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingEmail">price</label>
          </div>
          {formik.touched.price && formik.errors.price ? (
            <p className="text-danger">{formik.errors.price}</p>
          ) : null}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingEmail">description</label>
          </div>
          {formik.touched.description && formik.errors.description ? (
            <p className="text-danger">{formik.errors.description}</p>
          ) : null}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="quantity"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingEmail">quantity</label>
          </div>
          {formik.touched.quantity && formik.errors.quantity ? (
            <p className="text-danger">{formik.errors.quantity}</p>
          ) : null}
          <div className="form-floating mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              name="category"
              id="floatingCategory"
              placeholder="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="babies">babies</option>
              <option value="box games">box games</option>
              <option value="multi-age">multi-age</option>
              <option value="cars">cars</option>
              <option value="dolls">dolls</option>
              <option value="motorized">motorized</option>
            </select>
            <label htmlFor="floatingCategory">category</label>
          </div>
          {formik.touched.category && formik.errors.category ? (
            <p className="text-danger">{formik.errors.category}</p>
          ) : null}
          {formik.touched.category && formik.errors.category ? (
            <p className="text-danger">{formik.errors.category}</p>
          ) : null}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="image"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingEmail">image</label>
          </div>
          {formik.touched.image && formik.errors.image ? (
            <p className="text-danger">{formik.errors.image}</p>
          ) : null}
          <div className="form-floating mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              name="isItOnSale"
              placeholder="isItOnSale"
              value={formik.values.isItOnSale as any}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floatingIsItOnSale"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            <label htmlFor="floatingIsItOnSale">isItOnSale</label>
          </div>
          {formik.touched.isItOnSale && formik.errors.isItOnSale ? (
            <p className="text-danger">{formik.errors.isItOnSale}</p>
          ) : null}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="salePrice"
              name="salePrice"
              value={formik.values.salePrice as any}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="floatingEmail">salePrice</label>
          </div>
          {formik.touched.salePrice && formik.errors.salePrice ? (
            <p className="text-danger">{formik.errors.salePrice as string}</p>
          ) : null}
          <Link to={`/storContainer`}>
            <p className="text-center mt-3">bake to storContainer</p>
          </Link>
          <button
            type="submit"
            className="btn btn-secondary w-100 mt-3"
            disabled={!(formik.isValid && formik.dirty)}
          >
            up date card
          </button>
        </form>
        <div className="mt-auto"></div>
      </div>
    </>
  );
};
export default EditProduct;
