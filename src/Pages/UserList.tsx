import React, { useEffect, useState,memo } from "react";
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
import "./showproductlist.scss";
import auth from "../firebase_auth/firebase";
import { getDatabase, ref, child,remove } from "firebase/database";
import "./userlist.scss";

// import { getAuth } from "firebase/auth";
const UserList = () => {
  
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [haveEditAccess, setHaveEditAccess] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState('')

  const UserHeadings = ["First Name", "Last Name", "Email", "Role","Password", "Actions"];
  interface userlistType {
     
    firstName:string,
    lastName:string,
    email:string,
    role:string,
    password:string,
   
  };
  
  const initialValues:userlistType = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password:''
  };

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    touched,
  } = useFormik({
    initialValues,
    // validationSchema: editProductSchemas,
    onSubmit: (formData) => {
      console.log(formData,'...........formData in userlist ')
      if (editUser) {  
       
        axios
          .put(`https://my-json-server.typicode.com/priyanka807/demo/userlist/${userId}`, {id:userId,email:values.email,password:values.password, firstName:values.firstName, lastName:values.lastName,role:values.role})
          .then((response) => {
           localStorage.setItem('role',values.role)
            setIsEditing(false);
            setEditUser(null);
          })
          .catch((error) => {
            console.error(error);



          });
      }
    },
  });


  useEffect(()=>{
    axios.get("https://my-json-server.typicode.com/priyanka807/demo/userlist").then((response) => {
      setUsers(response.data);
    });

  })
  useEffect(() => {
    if(role==='user'){
      navigate('/ShowProductList')
      return
    }
    axios
      .get(`https://my-json-server.typicode.com/priyanka807/demo/roleaccess?menu=productList&role=${role}`)
      .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          // console.log(response.data,'response.data in userlist page')
          const userAccess = response.data[0];
          setHaveEditAccess(userAccess.haveedit);
        } else {
          navigate("/");
          toast.warning("You are not authorized to access");
        }
      })
      .catch((error) => {
        toast.error("An error occurred while fetching user access data");
      });
  }, [navigate]);

  const handleDelete = (id, userData) => {
    console.log(id,'userData')
    if(role===userData.role &&userData?.id===id){
      toast.warning("you can't delete YourSelf")
      return
    }
    
    if(role==='admin' && userData?.role==='superadmin')
    {
      toast.warning("You are not authorized to Delete SuperAdmin");
      return
    }
    if (haveEditAccess) {
      confirmAlert({
        title: "Confirm Delete",
        message: "Are you sure you want to delete this user?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              try {
              

                

                await axios.delete(`https://my-json-server.typicode.com/priyanka807/demo/userlist/${id}`);
                
               
// const dbRef = ref(getDatabase());
// remove(child(dbRef, `users/${id}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });



                if(userData.id===id){
               localStorage.removeItem('id');
                  localStorage.removeItem('password');
                  localStorage.removeItem('role');
                }else{
                  toast.error('i did not get same id ')
                }
                
              } catch (error) {
                console.error(error);
              }
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    } else {
      toast.error("You are not authorized to delete users");
    }
  };

  const handleEdit = (user) => {

    if(role==='admin' && user?.role==='superadmin')
    {
      toast.warning("You are not authorized to Edit SuperAdmin");
      return
    }
    if (haveEditAccess) {
      setEditUser(user);
      setUserId(user.id)
      setIsEditing(true);
      setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        password:user.password
      });
    } else {
      toast.error("You are not authorized to edit users");
    }
  };
  //  const modals = useMemo(()=>return(
    
  //  ))
  return (
    <>
      <div className="container mt-4">
        <h5 className="text-dark product-list" style={{ color: "black" }}>
          User List
        </h5>
        <div style={{ padding: "10px 20px", marginTop: "40px" }}>
          <div className="table-container">
            <table className="table table-striped table-bordered table-dark p-4">
              <thead className="thead">
                <tr>
                  {UserHeadings.map((User, index) => (
                    <th scope="col" key={index}>
                      {User}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="tbody">
                {users.map((user:userlistType, index) => (
                  <tr key={index}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                
                    <td>{user.role || "User"}</td>
                    <td>{user.password}</td>
                    <td>
                      {haveEditAccess && (
                        <>
                          <span
                            className="text-danger"
                            onClick={() => handleDelete(user.id, user)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </span>
                          &nbsp;&nbsp;
                          <span
                            className="text-success"
                            onMouseEnter={(e:any) => (e.target.style.color = "blue")}
                            onMouseLeave={(e:any) => (e.target.style.color = "green")}
                            onClick={() => handleEdit(user)}
                          >
                            <i className="fa-regular fa-pen-to-square"></i>
                          </span>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        show={isEditing}
        onHide={() => setIsEditing(false)}
        className="modal fade"
        style={{ background: "#21252" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit}
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ padding: "0px 15px" }}
          >
            <div className="mb-3 col-lg-12">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                required
              />
              {touched.firstName && errors.firstName && (
                <span className="error text-danger">{errors.firstName}</span>
              )}
            </div>

            <div className="mb-3 col-lg-12 w-100">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                required
              />
              {touched.lastName && errors.lastName && (
                <span className="error text-danger">{errors.lastName}</span>
              )}
            </div>

            <div className="mb-3 col-lg-12 w-100">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
              />
              {touched.email && errors.email && (
                <span className="error text-danger">{errors.email}</span>
              )}
            </div>
            <div className="mb-3 col-lg-12 w-100">
              <label htmlFor="password" className="form-label">
               Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                required
              />
              {touched.password && errors.password && (
                <span className="error text-danger">{errors.password}</span>
              )}
            </div>
            <div className="mb-3 col-lg-12 w-100">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                value={values.role}
                onChange={handleChange}
                id="role"
                name="role"
                className="form-select"
                aria-label="Default select example"
              >
                <option value="">Select Role</option>
               {role==='superadmin' &&<option value="superadmin">SuperAdmin</option> } 
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
           
            <Modal.Footer>
              <Button variant="secondary btn-md" onClick={() => setIsEditing(false)}>
                Close
              </Button>
              <Button variant="primary btn-md" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(UserList);
