import * as yup from 'yup'
const body = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export default {
  body,
}
