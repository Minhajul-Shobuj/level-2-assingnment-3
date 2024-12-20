import express, { Express, Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import { UserRoute } from "./app/modules/user/user.route";
import { BlogRoute } from "./app/modules/blog/blog.route";
import { AuthRoute } from "./app/modules/auth/auth.route";

const app: Express = express();
//parser
app.use(express.json());
app.use(cors());

app.use("/api/auth", UserRoute);
app.use("/api/auth", BlogRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/admin/users", UserRoute);
app.use("/api/admin/blogs", BlogRoute);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Blogging Web App😉");
});

app.use(notFound);
export default app;
