import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import './signup.scss';
import { useState,memo,useMemo } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from "../firebase_auth/firebase";
import { useNavigate } from "react-router-dom";
import { signupSchemas } from '../validation/signupSchemas';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Signup = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const navigate = useNavigate();

  interface FormValues {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    role:string;
  }

  const initialValues:FormValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    role:''
  };

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchemas,
    onSubmit: (values) => {
      console.log(values,'values')
      if (termsChecked) {
        createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user,'user')

            //db.json  create obj in db json  
            // let payload = {
            //   id: values.email,
            //   email:values.email,
            //   firstName: values.first_name,
            //   lastName: values.last_name,
            //   password: values.password,
            //   role:values.role,
            // };

           // Store user data in Firebase
            // try {
            //   axios.post("http://localhost:9020/userlist", payload).then((res) => {
            //     // localStorage.setItem('id',res.data.id);
            //     // localStorage.setItem('signuppassword',res.data.password);

            //     toast.success("Registered Successfully");


            //     navigate('/');
            //   }).catch((error)=>{
            //     setError("email already exist")
            //   });
            // } catch (error) {
            //   console.log(error?.response?.status, 'error');
            // }



          })
          .catch((error) => {
            const errorCode = error.code;
            setError(errorCode);
            const errorMessage = error.message;
            toast.error(errorMessage)
          });
      } else {
        toast.error('Please accept the terms and conditions');

        
      }
    }
  });
const memorizedHandlesubmit = useMemo(()=>handleSubmit,[handleSubmit])
const options = useMemo(()=>{
  return (<>
   <option value="">Select Role</option>
              <option value="superadmin">SuperAdmin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
  </>)
},[])
  return (
    <>
      <div className='main-container-signup'>
        <div className={`signup-form ${isSubmit ? 'signup-form1' : null}`}>
          <form onSubmit={memorizedHandlesubmit }>
            <h2 className=' fw-bold' style={{ color: 'white' }}>Sign Up</h2>
            <p>Please fill in this form to create an account!</p>

            <div className="form-group">
              <div className="col"><input type="text" className="form-control  form-control-signup" name="first_name" placeholder="First Name"
                onChange={handleChange} onBlur={handleBlur} value={values.first_name} required /></div>
              {touched.first_name && errors.first_name ? (<span className='error ' onClick={() => setIsSubmit(true)}>{errors.first_name}</span>) : null}
            </div>

            <div className="form-group">
              <div className="col"><input type="text" className="form-control  form-control-signup " name="last_name" placeholder="Last Name"
                onChange={handleChange} onBlur={handleBlur}
                value={values.last_name} required /></div>
              {touched.last_name && errors.last_name ? (<span className='error ' onClick={() => setIsSubmit(true)}>{errors.last_name}</span>) : null}
            </div>

            <div className="form-group">
              <input type="email" className="form-control  form-control-signup" name="email" placeholder="Email" onChange={handleChange} onBlur={handleBlur} value={values.email} required />
              {touched.email && errors.email ? (<span className='error ' onClick={() => setIsSubmit(true)}>{errors.email}</span>) : null}
            </div>
            <div className="form-group">
              <input type="password" className="form-control  form-control-signup" name="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password} required />
              {touched.password && errors.password ? (<span className='error ' onClick={() => setIsSubmit(true)}>{errors.password}</span>) : null}
            </div>
            <div className="form-group">
              <input type="password" className="form-control  form-control-signup" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} onBlur={handleBlur} value={values.confirm_password} required />
              {touched.confirm_password && errors.confirm_password ? (<span className='error ' onClick={() => setIsSubmit(true)}>{errors.confirm_password}</span>) : null}
            </div>

            <div className="mb-3 col-lg-12 w-100">
             
              <select
                value={values.role}
                onChange={handleChange}
                id="role"
                name="role"
                className="form-select"
                aria-label="Default select example"
              >
               {options}
              </select>
              {touched.role && errors.role ? (<span className='error ' onClick={() => setIsSubmit(true)}>{errors.role}</span>) : null}

            </div>
            <div className="form-group">
              <label className="form-check-label"><input type="checkbox" checked={termsChecked} onChange={() => setTermsChecked(!termsChecked)} /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
            </div>
            {error ? <span className='error'>${error}</span> : null}

       <div>
       </div>


              

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-lg" onClick={() => setIsSubmit(true)} >Sign Up</button>
            </div>
            <div>Already have an account? <Link to="/">Login here</Link></div>
          </form>
        </div>
        
      </div>
    </>
  );
}

export default memo(Signup);
