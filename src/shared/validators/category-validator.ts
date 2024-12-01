import * as yup from 'yup'

const findParams = yup.object().shape({
  userId: yup.string().required("O campo 'userId' é obrigatório"),
  type: yup.boolean().required("O campo 'type' é obrigatório"),
})
const bodyPost = yup.object().shape({
  title: yup.string().required("O campo 'title' é obrigatório"),
  color: yup.string().required("O campo 'color' é obrigatório"),
  icon: yup.string().required("O campo 'icon' é obrigatório"),
  type: yup.boolean().required("O campo 'type' é obrigatório"),
  userId: yup.string().required("O campo 'user_id' é obrigatório"),
})
const bodyPut = yup.object().shape({
  title: yup.string().required("O campo 'title' é obrigatório"),
  color: yup.string().required("O campo 'color' é obrigatório"),
  icon: yup.string().required("O campo 'icon' é obrigatório"),
  userId: yup.string().required("O campo 'user_id' é obrigatório"),
})

export default {
  findParams,
  bodyPost,
  bodyPut,
}
