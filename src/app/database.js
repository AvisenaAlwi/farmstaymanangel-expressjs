import { PrismaClient } from "@prisma/client";
import logger from "./logging.js";

const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  logger.info(e.query);
});
prisma.$on("info", (e) => {
  logger.info(e);
});
prisma.$on("warn", (e) => {
  logger.warn(e);
});
prisma.$on("error", (e) => {
  logger.error(e);
});

export default prisma;
