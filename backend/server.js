import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import Terms from "./models/Terms.js";
import { seedDefaultTerms } from "./seed.js";

dotenv.config();

const fastify = Fastify({ logger: true });

// Enable CORS
await fastify.register(cors, { origin: "*" });

// Route to get terms by language
fastify.get("/terms/:lang", async (req, reply) => {
  try {
    const { lang } = req.params;
    const terms = await Terms.findOne({ where: { language: lang } });
    if (!terms) return reply.status(404).send({ error: "Not found" });

    // Return only the JSON content
    return terms.content;
  } catch (err) {
    console.error("Error fetching terms:", err);
    return reply.status(500).send({ error: "Internal server error" });
  }
});


// Start server and run seeder
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ force: true }); // Drops and recreates tables
    console.log("Database synced");

    await seedDefaultTerms(); // seed default terms
    console.log("Default terms seeded");

    await fastify.listen({ port: process.env.PORT || 4000 });
    console.log(`Server running at http://localhost:${process.env.PORT || 4000}`);
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
