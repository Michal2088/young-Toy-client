import { FunctionComponent, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { addNewProduct } from "../services/productsService";

interface NewProductProps {}

const NewProduct: FunctionComponent<NewProductProps> = () => {
  const navigate = useNavigate();
  const [errorSameName, setErrorSameName] = useState<string>("");
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: " ",
      quantity: 0,
      category: "",
      image: "",
      isItOnSale: false,
      salePrice: 0,
    },
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
    onSubmit: (values: Product) => {
      addNewProduct(values)
        .then(() => {
          successMsg("product add successfully");
          navigate("/storContainer");
        })
        .catch((err) => {
          setErrorSameName(err.response.data);
          errorMsg(err.response.data);
        });
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="container d-flex flex-column min-vh-100">
        <form onSubmit={formik.handleSubmit} className="m-5 w-50 mx-auto">
          <h3 className="text-center display-5">add product</h3>
          <h2>{errorSameName}</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingEmail"
              placeholder="name"
              name="name"
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
              id="floatingEmail"
              placeholder="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option selected>category</option>
              <option value="babies">babies</option>
              <option value="box games">box games</option>
              <option value="multi-age">multi-age</option>
              <option value="cars">cars</option>
              <option value="dolls">dolls</option>
              <option value="motorized">motorized</option>
            </select>
          </div>
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floatingInput"
            >
              <option selected>isItOnSale</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
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
            disabled={!formik.dirty}
          >
            Add new product
          </button>
        </form>
        <div className="mt-auto"></div>
      </div>
    </>
  );
};

export default NewProduct;
