import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import { errorsMiddleware } from "./middlewares/errors.middleware";

const PORT = process.env.PORT || 3030;
const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(morgan("common"));
app.use(express.json());

app.use("/api", router);
app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.debug(`[SERVER] Server running on port ${PORT}`);
});
