  import * as Yup from 'yup';
   
  export const signupSchemas = Yup.object({
    first_name:Yup.string().min(3).max(25).required("please enter your  firstName"),
    last_name:Yup.string().min(3).max(15).required("please enter your  lastName"),
    email:Yup.string().email('Email is invalid').required('please enter   your  valid email'),
    password:Yup.string().min(6).max(24).required('please enter your  password'),
    confirm_password: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], "Password must match"),
    role:Yup.string().required("please select the role")
    // confirm_password:Yup.string().required().oneOf([Yup.ref('password'),null],"Password must match").required('Please confirm your password'),
  
  }) 