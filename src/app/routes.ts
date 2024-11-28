import express from 'express';
import userRouter from '../modules/user/user.routes'
import categoryRouter from '../modules/category/category.routes';
import transactionRouter from '../modules/transaction/transaction.routes';

const routes = (app: express.Application) => {
    app.use(
        express.json(),
        userRouter,
        categoryRouter,
        transactionRouter
    )
} 


export default routes;