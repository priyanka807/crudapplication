import * as Yup from 'yup';

export const showProductListSchemas = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Name must be at least 4 characters')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces')
    .required('Name is required'),
  description: Yup.string()
    .min(12, 'Description must be at least 12 characters')
    .matches(/^[A-Za-z\s]+$/, 'Description can only contain letters and spaces')
    .required('Description is required'),
  category: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Category can only contain letters and spaces')
    .required('Category must be defined'),
  price: Yup.number().required('Price is required'),
});
