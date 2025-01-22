import * as yup from 'yup'

const body = yup.object().shape({
  title: yup.string().required("O campo 'title' é obrigatório"),
  value: yup.number().required("O campo 'value' é obrigatório"),
  type: yup.string().required("O campo 'type' é obrigatório"),
  date: yup.date().required("O campo 'date' é obrigatório"),
  categoryId: yup.string().required("O campo 'categoryId' é obrigatório"),
})

const findManyParams = yup.object().shape({
  userId: yup.string().required("O campo 'userId' é obrigatório"),
  startDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required("O campo 'startDate' é obrigatório"),
  endDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required("O campo 'endDate' é obrigatório"),
})

export default {
  body,
  findManyParams,
}
