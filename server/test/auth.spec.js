const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST Login Authentication", () => {
  it("it should log user in if details are correct", (done) => {
    chai
      .request(app)
      .post(`/auth/login`)
      .send({ username: "thomas", password: "123456" })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("id").eql("number");
        done();
      });
  });

  it("it should return a 400 and error message if fields are empty", (done) => {
    chai
      .request(app)
      .post(`/auth/login`)
      .send({})
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have
          .property("error")
          .eql("Username and password required");
        done();
      });
  });

  it("it should return a 401 and error message if user does not exist", (done) => {
    chai
      .request(app)
      .post(`/auth/login`)
      .send({ username: "randomuser@gmail.com", password: "123456" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have
          .property("error")
          .eql("Wrong username and/or password");
        done();
      });
  });

  it("it should return a 401 and an error message if user password is incorrect", (done) => {
    chai
      .request(app)
      .post(`/auth/login`)
      .send({ username: "thomas", password: "1234dk56" })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have
          .property("error")
          .eql("Wrong username and/or password");
        done();
      });
  });
});

const agent = chai.request.agent(app);

describe("/GET Test for user details endpoint", () => {
  it("it should return a 200 and user details if authorized", (done) => {
    agent
      .post("/auth/login")
      .send({
        username: "thomas",
        password: "123456",
      })
      .then((err, res) => {
        res.should.have.cookie("token");
        return agent.get("/auth/user").end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("id").eql("number");
          done();
        });
      });
  });
});
