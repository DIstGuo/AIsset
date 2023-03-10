import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createImage({
      prompt: `${prompt}`,
      n: 4,
      size: "1024x1024",
    });

    console.log(response);
    const imageUrls = response.data.data.map((imageData) => imageData.url);
    console.log(imageUrls);

    res.status(200).send({
      imageUrls: imageUrls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(3000, () =>
  console.log("AI server started on http://localhost:3000")
);
