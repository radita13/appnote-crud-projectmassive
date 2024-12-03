import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.use(bodyParser.json());
app.use('/api', notesRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})