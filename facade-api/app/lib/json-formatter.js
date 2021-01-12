const config = require("../configs/config");

module.exports = (req, res, body) => {
  function formatError(res, body) {
    const isClientError = res.statusCode >= 400 && res.statusCode < 500;

    if (isClientError) {
      return {
        status: "Error",
        code: body.name,
        message: body.message,
      };
    } else {
      const inDebugMode = config.app.NODE_ENV === "development";
      return {
        status: "Error",
        code: inDebugMode ? body.name : "InternalServerError",
        message: inDebugMode ? body.message : "Internal Server Error",
        data: inDebugMode ? body.stack : undefined,
      };
    }
  }

  function formatSuccess(res, body) {
    if (body.data && body.pagination) {
      return {
        status: "Success",
        data: body.data,
        pagination: body.pagination,
      };
    } else {
      return {
        status: "Success",
        data: body,
      };
    }
  }

  let response;

  if (body instanceof Error) {
    response = formatError(res, body);
  } else {
    response = formatSuccess(res, body);
  }

  response = JSON.stringify(response);
  res.header("Content-Length", Buffer.byteLength(response));
  res.header("Content-Type", "application/json");

  return response;
};
