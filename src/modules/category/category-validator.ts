import * as yup from 'yup'

const getSummary = yup.object().shape({
  userId: yup.string().required("O campo 'userId' é obrigatório"),
  type: yup.boolean().required("O campo 'type' é obrigatório"),
  startDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required("O campo 'startDate' é obrigatório"),
  endDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required("O campo 'endDate' é obrigatório"),
})
const bodyPost = yup.object().shape({
  title: yup.string().required("O campo 'title' é obrigatório"),
  color: yup.string().required("O campo 'color' é obrigatório"),
  icon: yup.string().required("O campo 'icon' é obrigatório"),
  type: yup.boolean().required("O campo 'type' é obrigatório"),
})
const bodyPut = yup.object().shape({
  title: yup.string().required("O campo 'title' é obrigatório"),
  color: yup.string().required("O campo 'color' é obrigatório"),
  icon: yup.string().required("O campo 'icon' é obrigatório"),
})

const findAllParams = yup.object().shape({
  type: yup.boolean().required("O campo 'type' é obrigatório"),
  userId: yup.string().required("O campo 'userId' é obrigatório"),
})

export default {
  getSummary,
  bodyPost,
  bodyPut,
  findAllParams,
}
