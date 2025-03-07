import * as yup from 'yup'

const create = yup.object().shape({
  title: yup.string().required("O campo 'title' é obrigatório"),
  value: yup.number().required("O campo 'value' é obrigatório"),
  type: yup.string().required("O campo 'type' é obrigatório"),
  date: yup.date().required("O campo 'date' é obrigatório"),
  categoryId: yup.string().required("O campo 'categoryId' é obrigatório"),
  userId: yup.string().required("O campo 'userId' é obrigatório"),
})

const edit = yup.object().shape({
  title: yup.string().required("O campo 'title' é obrigatório"),
  value: yup.number().required("O campo 'value' é obrigatório"),
  type: yup.string().required("O campo 'type' é obrigatório"),
  date: yup.date().required("O campo 'date' é obrigatório"),
  categoryId: yup.string().required("O campo 'categoryId' é obrigatório"),
  userId: yup.string().required("O campo 'userId' é obrigatório"),
  id: yup.string().required("O campo 'id' é obrigatório"),
})

const remove = yup.object().shape({
  userId: yup.string().required("O campo 'userId' é obrigatório"),
  id: yup.string().required("O campo 'id' é obrigatório"),
})

const findMany = yup.object().shape({
  userId: yup.string().required("O campo 'userId' é obrigatório"),
  page: yup.number().required("O campo 'page' é obrigatório"),
  limit: yup.number().required("O campo 'limit' é obrigatório"),
  startDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required("O campo 'startDate' é obrigatório"),
  endDate: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required("O campo 'endDate' é obrigatório"),
  orderBy: yup.string().required("O campo 'orderBy' é obrigatório"),
})

const findOne = yup.object().shape({
  userId: yup.string().required("O campo 'userId' é obrigatório"),
  id: yup.string().required("O campo 'id' é obrigatório"),
})

const findMetrics = yup.object().shape({
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
  create,
  edit,
  remove,
  findMany,
  findOne,
  findMetrics,
}
