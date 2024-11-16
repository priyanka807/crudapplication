import { Link } from "react-router-dom";
import "./Loginpage.scss";
import { useFormik} from "formik";
import React, { useMemo } from "react";
import { loginSchemas } from "../validation/loginSchemas";
import { useState, useEffect,memo ,useRef} from "react";
import auth from "../firebase_auth/firebase";
import axios  from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useMemorizedfun from "./useMemorizedfun";

interface formInput {
 email:string,
 password:string
}
const initialValues:formInput = {
  email: "",
  password: "",
};

const newUser =  JSON.parse(localStorage.getItem("newUser"))

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, seterrMsg] = useState("");
  const [getEmail, setGetEmail] = useState("");
  const refEmail = useRef()
  const refPassword = useRef()

  
  //  console.log(newUser.password ,'newUser ')
  // console.log(refEmail, refPassword,'currentElement')

  useEffect(() => {
    refEmail.current.style.color = 'gray';
  refPassword.current.style.color = 'gray';
  }, [refEmail,refPassword]);



  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,

      validationSchema:loginSchemas,
      
      
      onSubmit: (values) => {
        // signInWithEmailAndPassword(auth, values.email, values.password)
        //   .then((userCredential) => {
        //     const user = userCredential.user; 
              //  const id = user.email  
         

            
            axios.get(`http://localhost:9020/userlist/${values.email}`)
            .then((res) => {
         
              if(res.data.password===values.password){
            
                if (res.data.role === "superadmin"||res.data.role === "admin") {
                  toast.success('successfully signin');
                  navigate('/user-list');
                  localStorage.setItem('id',res.data.id );
                  localStorage.setItem('password', res.data.password);
                  localStorage.setItem('role',res.data.role );

              } else{
                localStorage.setItem('id',res.data.id );
                localStorage.setItem('password', res.data.password);
               
                const roleCandidate = "user"
                localStorage.setItem('role',roleCandidate );
                navigate('/ShowProductList')}
           
          
          }

                
              else{
            toast.warning("password do not match")
          }
               
            })
            .catch((error) => {
              toast.error("Invalid login credentials. Please check and try again,User was not found ")

            });

        
      
       
        
            
  // })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           const errorMessage = error.message;
  //           if(errorMessage.includes('user')){
  //             toast.error('Invalid login credentials. Please check and try again,User was not found')
  //           }else{
  //             toast.error('Invalid login credentials.Password do not match')

  //           }
  //         console.log(errorMessage,'errorMessage in login')

     
           
  //         });
      },
    });

  return (
    <>
 
      <div className="form-container">
        <div className={`form-content ${isSubmitted ? "custom-class" : ""}`} >
          <form onSubmit={useMemorizedfun(handleSubmit)}>
          <h2 className=' fw-bold'>Sign In</h2>
<p style={{color:'gray'}}>Please enter your email & password to continue</p>
            <div className="mb-3">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                className="form-control"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={refEmail}
                required
              />
              {touched.email && errors.email ? (
                <h6
                  className="form-error  errors"
                  onClick={() => setIsSubmitted(true)}
                >
                  {errors.email}
                </h6>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                className="form-control"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={refPassword}
                required
              />
              {touched.password && errors.password ? (
                <h6
                  className="form-error  errors"
                  onClick={() => setIsSubmitted(true)}
                >
                  {errors.password}
                </h6>
              ) : null}
            </div>
            <button
              type="submit"
              className="continue mt-4"
           
            >
              {" "}
              Continue
            </button>

            <div className="signup btn-primary"  
> 
              <Link
              
                to="/signup"
                style={{ textDecoration: "none", color: "black" ,textAlign:"center"}}
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(LoginPage);
