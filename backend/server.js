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

// Initialize DB and seed only once
let initialized = false;
async function init() {
  if (!initialized) {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    // Avoid dropping tables in production
    await sequelize.sync({ force: process.env.NODE_ENV !== "production" });
    console.log("✅ Database synced");

    // Seed only if needed
    await seedDefaultTerms();
    console.log("✅ Default terms seeded");

    initialized = true;
  }
}

// Start server (Render always sets process.env.PORT)
const PORT = process.env.PORT || 4000;


await init();
fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) throw err;
  console.log(`🚀 Server running at ${address}`);
});
