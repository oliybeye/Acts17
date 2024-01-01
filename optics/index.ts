import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT ?? 5000;
const directory =
  process.env.DIR ??
  "C:/Users/oliya/Documents/Repository/Acts17/contender/images/";

app.get("/api/images", (req: Request, res: Response) => {
  const { path } = req.query;
  console.log(`getting image: ${path}`)
  return res.sendFile(directory + path);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
