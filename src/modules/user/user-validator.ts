import * as yup from 'yup'
const register = yup.object().shape({
  firstName: yup.string().required("O campo 'firstName' é obrigatório"),
  lastName: yup.string().required("O campo 'lastName' é obrigatório"),
  email: yup
    .string()
    .email("O campo 'email' deve ser um email válido")
    .required("O campo 'email' é obrigatório"),
  password: yup.string().required("O campo 'password' é obrigatório"),
})

const updateMonthlyGoal = yup.object().shape({
  userId: yup.string().required("O campo 'userId' é obrigatório"),
  monthlyGoal: yup.number().required("O campo 'monthlyGoal' é obrigatório"),
})

const findMonthlyGoal = yup.object().shape({
  userId: yup.string().required("O campo 'userId' é obrigatório"),
})
export default {
  register,
  updateMonthlyGoal,
  findMonthlyGoal,
}
