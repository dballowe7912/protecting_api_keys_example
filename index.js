import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import rateLimit from 'express-rate-limit';
import cors from "cors";
const app = express();
const port = 3000;

import weather from "./weather/index.js";

app.use(express.json());

//change to http://euphoriabotanical.com 
const whitelist = ['http://127.0.0.1', 'http://127.0.0.1:5500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback( new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const limiter = rateLimit({
    windowMs: 1000,
    max: 1
});

app.use(limiter);

//test route
app.get("/", (req, res) => res.json( {success: "Hello World"}));

app.use("/weather", weather);

app.listen(port, () => console.log(`App listening on port ${port}`));