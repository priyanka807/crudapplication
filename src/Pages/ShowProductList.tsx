import React, { useCallback, useEffect, useState,memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useFormik } from "formik";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editProductSchemas } from "../validation/editProductSchemas";
import './showproductlist.scss'
import {useSelector,useDispatch} from 'react-redux'
import fetchProductList from "../store/features/lorem/loremSlice";

const ShowProductList = () => {
  interface productTypes {
    id:number,
    name:string,
    category:string,
    description:string,
    price:number,
   }

  const productData = useSelector((state) => state.productData.state);

  // const dispatch = useDispatch();

  const [Product, setProducts] = useState<productTypes[]>([]);

  const [editProductId, setEditProductId] = useState<productTypes|null>(null);
  const [haveedit, editchange] = useState(false);
  const [haveview, viewchange] = useState(false);
  const [haveadd, addchange] = useState(false);
  const [haveremove, removechange] = useState(false);
  const navigate = useNavigate()
  const ProductHeadings = useMemo(()=>[
      "Product Name",
      "Category",
      "Description",
      "Price",
      "Action"
    ]
  ,[])

  const [edit, setEdit] = useState(false);

   

  const initialValues  = {
    name:'' ,
    description:editProductId?.description || "",
    category: editProductId?.category || "",
    price:editProductId?.price || "",
  };

  const {
    values,
   errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
  } = useFormik({
    initialValues: initialValues,

    validationSchema: editProductSchemas,
    onSubmit:(values)=>{
      axios
      .put(`https://my-json-server.typicode.com/priyanka807/demo/productList/${editProductId?.id}`, values)
      .then((res) => {
        const newProduct = res.data;
         navigate('/ShowProductList')
        setEdit(false);
      })
      .catch((error) => console.error(error));
    }
   
  })
 
  useEffect(()=>{
    setFieldValue('name', editProductId?.name || '')
    setFieldValue('description', editProductId?.description|| '')
    setFieldValue('category', editProductId?.category || '')
    setFieldValue('price', editProductId?.price || '')


  },[edit])
  
  useEffect(() => {
    axios
      .get(`https://my-json-server.typicode.com/priyanka807/demo/productList`)
      .then((response) => {

        setProducts(response.data)
      });
  }, []);



  const accessAuthentication = useCallback(() => {
    const role = localStorage.getItem('role')
  
    axios.get(`https://my-json-server.typicode.com/priyanka807/demo/roleaccess?menu=productList&role=${role}`)

      .then((res) => {
        if (res.status === 200) {
          return res.data
        }else{
          navigate('/')
          toast.warning('You are not authorized to access');
           throw new Error('unauthorized')
        }

      }).then((res)=>{
       if(res.length > 0){
        viewchange(true);
        let userobj = res[0];
        editchange(userobj.haveedit);
        addchange(userobj.haveadd);
        removechange(userobj.havedelete);
}


      })
      .catch((error) => {
      });
  },[]);

  useEffect(()=>{
    accessAuthentication()
  })
 




  const handleDelete = async (id) => {
    if(haveremove){
      confirmAlert({
        title: "Confirm Delete",
        message: "Are you sure to do this",
        buttons: [
          {
            label: "yes",
            onClick: async () => {
              try {
                const response = await axios.delete(
                  `https://my-json-server.typicode.com/priyanka807/demo/productList/${id}`
                );
                setProducts((prevStudents) =>
                  prevStudents.filter((product) => product.id !== id)
                );
              } catch (error) {
              }
            },
          },
          {
            label: "no",
            onClick: () => {},
          },
        ],
      });
    }else{
         toast.error('You are not authorized to access to remove')
    }
    
  };

  const handleEdit = async (data) => {
     if(haveedit){
      setEdit(true);
      setEditProductId(data);
     }else{
      toast.error('You are not authorized to access to edit')
     }
  
   
  };
    
  // const buttonDisable = editProductId?.name===values.name&&editProductId?.description===values.description
  // &&editProductId?.price===values.price&&editProductId?.category===values.category
  const buttonDisable = useMemo(() =>
    editProductId?.name === values.name &&
    editProductId?.description === values.description &&
    editProductId?.price === values.price &&
    editProductId?.category === values.category,
    [editProductId, values]
  );



const handleAdd = ()=>{
  if(haveadd){
    navigate('/addproductlist')
  }else{
    toast.error('You are not authorized to access to add')
  }
}

const button =useMemo(()=>{
  return <button className="btn btn-primary mb-3" style={{ float: "right" }} onClick={handleAdd}>        
  Add Product
</button>
},[handleAdd])

const productList = useMemo(() => (
  Product.map((product, index) => (
    <tr key={index}>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>
        <span
          className="text-danger"
          onClick={() => handleDelete(product.id)}
        >
          <i className="fa-solid fa-trash"></i>
        </span>
        &nbsp; &nbsp;
        <span
          className="text-success"
          onMouseEnter={(e) => (e.target.style.color = "blue")}
          onMouseLeave={(e) => (e.target.style.color = "green")}
          onClick={() => handleEdit(product)}
        >
          <i className="fa-regular fa-pen-to-square"></i>
        </span>
      </td>
    </tr>
  ))
), [Product]);



  return (
    <>
      <div className="container mt-4  ">
        <h5 className="text-dark product-list" style={{ color: "black" }}>
          {" "}
          Product List
          {button}
        </h5>
        <div
          style={{
          
            padding: "10px 20px",
            marginTop: "40px",
          }}
        >
          {" "}
          <div className="table-container">
          <table className="table table-striped table-bordered table-dark p-4  " style={{padding:'25px'}} >
            <thead className="thead">
              <tr>
                {ProductHeadings &&
                  ProductHeadings.map((Product, index) => (
                    <th scope="col" key={index} >
                      {Product}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="tbody">
              {productList}
            </tbody>
          </table>{" "}
          </div>
        </div>
      </div>

      <Modal show={edit} onHide={() => setEdit(false)} className="modal fade" style={{background:'#21252'}}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          
          <form
            onSubmit={handleSubmit}
            className="d-flex justify-content-center align-items-center  flex-column "
            style={{ padding: "0px 15px" }}
          >
            <div className="mb-3 col-lg-12">
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
                required
              />
                 {touched.name && errors.name ? (
              <span
                className="error  text-danger"
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
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                required
              />
                     {touched.description&&errors.description ? (
              <span
                className="error  text-danger"
              >
                {errors.description}
              </span>
            ) : null}
            </div>

            <div className="mb-3 col-lg-12 w-100">
              <label htmlFor="category" className="form-label">
                category
              </label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                required
              />
                         {touched.category&&errors.category? (
              <span
                className="error  text-danger"
              >
                {errors.category}
              </span>
            ) : null}
            </div>

            <div className="mb-3 col-lg-12 w-100">
              <label htmlFor="Price" className="form-label">
                price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={values.price}
                onChange={handleChange}
                required
                
              />
                         {touched.price&&errors.price ? (
              <span
                className="error  text-danger"
              >
                {errors.price}
              </span>
            ) : null}
            </div>

            <Modal.Footer>
              <Button
                variant="secondary btn-md "
                onClick={() => setEdit(false)}
              >
                Close
              </Button>
              <Button variant="primary btn-md " onClick={()=>handleSubmit} disabled={buttonDisable}>
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default memo(ShowProductList);
