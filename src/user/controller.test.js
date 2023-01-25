const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const { UserController } = require("./controller");
const { UserService } = require("./service");
const { UserRepository } = require("./repository");
const httpStatus = require('http-status');

describe("UserController", function () {
  describe("register", function () {
    let status, json, res, userController, userService;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      const userRepo = sinon.spy();
      userService = new UserService(userRepo);
    });

    it("should not register a user when name param is not provided", async function () {
      const req = { body: { email: faker.internet.email() } };

      await new UserController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(httpStatus.BAD_REQUEST);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid params");
    });

    it("should not register a user when name and email params are not provided", async function () {
      const req = { body: {} };

      await new UserController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(httpStatus.BAD_REQUEST);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid params");
    });

    it("should not register a user when email param is not provided", async function () {
      const req = { body: { name: faker.name.findName() } };

      await new UserController().register(req, res);

      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(httpStatus.BAD_REQUEST);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].message).to.equal("Invalid params");
    });

    it("should register a user when email and name params are provided", async function () {
      const req = {
        body: { name: faker.name.findName(), email: faker.internet.email() },
      };

      const stubValue = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const stub = sinon.stub(userService, "create").returns(stubValue);
      userController = new UserController(userService);

      await userController.register(req, res);
      expect(stub.calledOnce).to.be.true;
      expect(status.calledOnce).to.be.true;
      expect(status.args[0][0]).to.equal(httpStatus.CREATED);
      expect(json.calledOnce).to.be.true;
      expect(json.args[0][0].data).to.equal(stubValue);
    });
  });

  describe("getUser", function () {

    let req;
    let res;
    let userService;

    beforeEach(() => {
      req = { params: { id: faker.datatype.uuid() } };
      res = { json: function () {} };
      const userRepo = sinon.spy();
      userService = new UserService(userRepo);
    });

    it("should return a user that matches the id param", async function () {
      const stubValue = {
        id: req.params.id,
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };
      const mock = sinon.mock(res);
      mock.expects("json").once().withExactArgs({ data: stubValue });

      const stub = sinon.stub(userService, "getUser").returns(stubValue);
      const userController = new UserController(userService);
      await userController.getUser(req, res);
      expect(stub.calledOnce).to.be.true;
      mock.verify();
    });
  });
});
