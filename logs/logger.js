const { createLogger, transports, format } = require("winston");
const path = require("path");

const authLogger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, "user.log"),
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: path.join(__dirname, "user-error.log"),
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

const blogLogger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, "blog.log"),
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: path.join(__dirname, "blog-error.log"),
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
const tokenAuthLogger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, "token.log"),
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: path.join(__dirname, "token-error.log"),
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  authLogger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
  blogLogger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
  tokenAuthLogger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = { authLogger, blogLogger, tokenAuthLogger };
