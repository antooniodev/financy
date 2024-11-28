
import userRouter from '../modules/user/userRoutes'

const routes = (app: express.Application) => {
    app.use(
        express.json(),
        userRouter,
        categoryRouter,
        transactionRouter
    )
} 


export default routes;