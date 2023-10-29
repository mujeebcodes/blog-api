const { createLogger, transports, format } = require("winston");

const authLogger = createLogger({
  transports: [
    new transports.File({
      filename: "user.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "user-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

const blogLogger = createLogger({
  transports: [
    new transports.File({
      filename: "blog.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "blog-error.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
const tokenAuthLogger = createLogger({
  transports: [
    new transports.File({
      filename: "token.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: "token-error.log",
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
