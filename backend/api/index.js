import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import sequelize from "../db.js";
import Terms from "../models/Terms.js";
import { seedDefaultTerms } from "../seed.js";

dotenv.config();

const fastify = Fastify({ logger: false });

await fastify.register(cors, { origin: "*" });

fastify.get("/", async () => {
  return { message: "Backend is running 🚀" };
});

fastify.get("/terms/:lang", async (req, reply) => {
  try {
    const { lang } = req.params;
    const terms = await Terms.findOne({ where: { language: lang } });
    if (!terms) return reply.status(404).send({ error: "Not found" });

    return terms.content;
  } catch (err) {
    console.error("Error fetching terms:", err);
    return reply.status(500).send({ error: "Internal server error" });
  }
});

let initialized = false;
async function init() {
  if (!initialized) {
    await sequelize.authenticate();
    await sequelize.sync({ force: process.env.NODE_ENV !== "production" });
    await seedDefaultTerms();
    initialized = true;
  }
}

export default async function handler(req, res) {
  if (!initialized) await init();
  await fastify.ready();
  fastify.server.emit("request", req, res);
}
