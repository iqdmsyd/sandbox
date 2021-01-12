const mongoose = require("mongoose");
const User = require("../app/models/user/facade");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Users", () => {
  beforeEach((done) => {
    // Before each test we empty the database
    User.Model.remove({}, (err) => {
      if (err) done(err);
    });
    done();
  });
  /*
   * Test the /GET route
   */
  describe("GET /api/users", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe("POST /api/users", () => {
    it("it shout not POST a user without name field", (done) => {
      let user = {
        email: "iqdam@gmail.com",
      };
      chai
        .request(server)
        .post("/api/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.code.should.eql("InvalidArgumentError");
          done();
        });
    });
  });
  describe("POST /api/users", () => {
    it("it shout not POST a user without email field", (done) => {
      let user = {
        name: "Kim Minju",
      };
      chai
        .request(server)
        .post("/api/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.code.should.eql("InvalidArgumentError");
          done();
        });
    });
  });
  describe("POST /api/users", () => {
    it("it shout not POST a user without a valid email", (done) => {
      let user = {
        email: "mymail",
      };
      chai
        .request(server)
        .post("/api/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.code.should.eql("InvalidArgumentError");
          done();
        });
    });
  });
  describe("POST /api/users", () => {
    it("it shout POST a user", (done) => {
      let user = {
        name: "Iqdam Musayyad",
        email: "iqdam@gmail.com",
      };
      chai
        .request(server)
        .post("/api/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.status.should.eql("Success");
          res.body.should.be.a("object");
          res.body.data.should.have.property("name");
          res.body.data.should.have.property("email");
          done();
        });
    });
  });
  /*
   * Test the /GET/:id route
   */
  describe("GET /api/users/:id", () => {
    it("it should GET a user by the given id", (done) => {
      let user = new User.Model({
        name: "Kim Minju",
        email: "minju@gmail.com",
      });
      user.save((err, user) => {
        chai
          .request(server)
          .get("/api/users/" + user._id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("data");
            res.body.data.should.have.property("name");
            res.body.data.should.have.property("email");
            done();
          });
      });
    });
  });
  /*
   * Test the /PUT/:id route
   */
  describe("PUT /api/users/:id", () => {
    it("it should UPDATE a user given the id", (done) => {
      let user = new User.Model({
        name: "Kim Minju",
        email: "minju@gmail.com",
      });
      user.save((err, user) => {
        chai
          .request(server)
          .put("/api/users/" + user._id)
          .send({ name: "Kim Minju", email: "kimminju@gmail.com" })
          .end((err, res) => {
            res.should.have.status("204");
            done();
          });
      });
    });
  });
  /*
   * Test the /DELETE/:id route
   */
  describe("DELETE /api/users/:id", () => {
    it("it should DELETE a user given by id", (done) => {
      let user = new User.Model({ name: "Delima", email: "delima@gmail.com" });
      user.save((err, user) => {
        chai
          .request(server)
          .del("/api/users/" + user._id)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
    });
  });
});
