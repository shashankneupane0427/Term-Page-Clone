import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import Terms from "./models/Terms.js";
import { seedDefaultTerms } from "./seed.js";

dotenv.config();

const fastify = Fastify({ logger: false });

// Enable CORS
await fastify.register(cors, { origin: "*" });

// Root route
fastify.get("/", async () => {
  return { message: "Backend is running 🚀" };
});

// Route to get terms by language
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

// Ensure DB + seed runs only once
let initialized = false;
async function init() {
  if (!initialized) {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync({ force: true });
    console.log("Database synced");
    await seedDefaultTerms();
    console.log("Default terms seeded");
    initialized = true;
  }
}
await init();

// 🔹 Run locally on port 4000 for testing
if (process.env.NODE_ENV !== "production") {
  fastify.listen({ port: 4000 }, (err, address) => {
    if (err) throw err;
    console.log(`Server running locally at ${address}`);
  });
}

// 🔹 Export handler for Vercel serverless
export default async (req, res) => {
  await fastify.ready();
  fastify.server.emit("request", req, res);
};
