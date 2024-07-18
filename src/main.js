import web from "./app/web.js";
import logger from "../src/app/logging.js";

web.listen(3200, () => logger.info("server is running"));
