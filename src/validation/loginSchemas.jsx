
import * as Yup from 'yup';

import React from 'react'

export const loginSchemas =  Yup.object({
    email:Yup.string().email('email is invalid').required("please enter   your  valid email"),
    password:Yup.string().min(6).required("please enter your  password"),

})
  
   