import * as yup from 'yup'

const index = yup.object().shape({
  id: yup.string().required('o campo id é obrigatório'),
  userId: yup.string().required('o campo userId é obrigatório'),
})

const userId = yup.string().required('o campo userId é obrigatório')
export default {
  index,
  userId,
}
