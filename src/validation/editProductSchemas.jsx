import * as Yup from 'yup';

export const editProductSchemas = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
  description: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Description can only contain letters and spaces'),
  category: Yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Category can only contain letters and spaces'),
  price: Yup.number()
    .typeError('Price must be a valid number')
});
