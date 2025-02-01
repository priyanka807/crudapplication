import axios from "axios";
import React, { useState, useMemo, useEffect ,memo} from "react";
import { useNavigate } from "react-router-dom";
import "./addProduct.scss";
import { useFormik } from "formik";
import { showProductListSchemas  } from "../validation/showProductListSchemas";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import useMemorizedfun from "./useMemorizedfun";
const AddProductList= () => {

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  
  const initialValues = {
    name: "",
    description: "",
    category: "",
    price: "",
  };

  const {
    values,
    errors,
   
    touched,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: showProductListSchemas,
    onSubmit: async (values) => {
      const role = localStorage.getItem('role')


      
      try {
        axios.post("https://my-json-server.typicode.com/priyanka807/demo/productList", values).then((res)=>{
           navigate('/ShowProductList')

        })
      
       
      } catch (error) {
        toast.error("Error while adding a new user:", error);
      }

    
   
    }
  });
 
  return (
    <div className="body">
      <div className="container  shadow container-student p-5 rounded-2  ">
        <form
          onSubmit={useMemorizedfun(handleSubmit)}
          className="d-flex justify-content-center align-items-center  flex-column  "
        >
          <h3 className="" style={{color:'white'}}>Add Product</h3>

          <div className="mb-1 col-lg-12  col-sm-12  w-100 pb-3">
            <label htmlFor="name" className="form-label">
             Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="enter your product name"
              required
            />
            {touched.name && errors.name ? (
              <span
                className="error  text-danger"
                onClick={() => setIsSubmit(true)}
              >
                {errors.name}
              </span>
            ) : null}
          </div>
          <div className="mb-3 col-lg-12 w-100">
            <label htmlFor="description" className="form-label">
            Description
            </label>
            <input
              type="description"
              className="form-control"
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="enter your product description"

              required
            />
            {touched.description && errors.description ? (
              <span
                className="error  text-danger"
                onClick={() => setIsSubmit(true)}
              >
                {errors.description}
              </span>
            ) : null}
          
          </div>

          <div className="mb-3 col-lg-12 w-100">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              placeholder="enter your product category"

              required
            />

            {touched.category && errors.category ? (
              <span
                className="error  text-danger"
                onClick={() => setIsSubmit(true)}
              >
                {errors.category}
              </span>
            ) : null}
          </div>

          <div className="mb-3 col-lg-12 w-100">
            <label htmlFor="Price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              placeholder="enter your product price"

              required
            />
            {touched.price && errors.price ? (
              <span
                className="error  text-danger"
                onClick={() => setIsSubmit(true)}
              >
                {errors.price}
              </span>
            ) : null}
          </div>
          <button type="submit" className="submit_button btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(AddProductList);
