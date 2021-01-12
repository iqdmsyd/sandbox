const controller = require("./controller");

module.exports.register = (server) => {
  server.post(
    {
      path: "/api/users",
      name: "Create A User",
      version: "1.0.0",
      validation: { body: require("./validations/create-user") },
    },
    (...args) => controller.create(...args)
  );

  server.get(
    { path: "/api/users", name: "Get All User", version: "1.0.0" },
    (...args) => controller.find(...args)
  );

  server.get(
    { path: "/api/users/:id", name: "Get User by Id", version: "1.0.0" },
    (...args) => controller.findById(...args)
  );

  server.put(
    { path: "/api/users/:id", name: "Update User by Id", version: "1.0.0" },
    (...args) => controller.updateOne(...args)
  );

  server.del(
    { path: "/api/users/:id", name: "Delete User by Id", version: "1.0.0" },
    (...args) => controller.deleteOne(...args)
  );
};
