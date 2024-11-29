import * as yup from 'yup'
const body = yup.object().shape({
  firstName: yup.string().required("O campo 'firstName' é obrigatório"),
  lastName: yup.string().required("O campo 'lastName' é obrigatório"),
  email: yup
    .string()
    .email("O campo 'email' deve ser um email válido")
    .required("O campo 'email' é obrigatório"),
  password: yup.string().required("O campo 'password' é obrigatório"),
})

export default {
  body,
}
