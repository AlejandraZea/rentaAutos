import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'
import {connectDB} from "@server/db/connection";
import mongoose from "mongoose";
import adminRoutes from './routes/Admin'
import auth from './routes/auth'
import registerRoutes from "@server/routes/register";


const app = new Hono()

app.use('*', async (c, next) => {
  if (!mongoose.connection.readyState) {
    await connectDB();
  }
  await next();
});

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/admin', adminRoutes)
app.route('/api/admin', auth)
app.route('/api/admin', registerRoutes)

export default app
