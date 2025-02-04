import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import notFound from './app/middlewares/notFound'
import { UserRoute } from './app/modules/user/user.route'
import { BlogRoute } from './app/modules/blog/blog.route'
import { AuthRoute } from './app/modules/auth/auth.route'
import { AdminRoute } from './app/modules/admin/admin.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { BookRoute } from './app/modules/book/book.route'
import { OrderRoute } from './app/modules/orders/order.route'

const app: Express = express()
//parser
app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: ['http://localhost:5173/'],
    credentials: true,
  }),
)
//https://book-lover-front-end.vercel.app

app.use('/api/auth', UserRoute)
app.use('/api/blogs', BlogRoute)
app.use('/api/books', BookRoute)
app.use('/api/auth', AuthRoute)
app.use('/api/admin', AdminRoute)
app.use('/api/orders', OrderRoute)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello From BookLover Web App😉')
})

app.use(globalErrorHandler)
app.use(notFound)
export default app
