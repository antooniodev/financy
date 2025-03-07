import * as yup from 'yup'
const createSession = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export default {
  createSession,
}
