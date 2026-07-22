const { logger } = require("../../app/helpers/logger");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function retry(
  fn,
  { retries = 3, delay = 1000, backoff = 2, shouldRetry = () => true } = {},
) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;

      if (attempt === retries || !shouldRetry(err)) {
        throw err;
      }

      logger.warn(
        `Attempt ${attempt}/${retries} failed: ${err.message}. Retrying in ${delay}ms...`,
      );

      await sleep(delay);
      delay *= backoff;
    }
  }

  throw lastError;
}

module.exports = retry;
