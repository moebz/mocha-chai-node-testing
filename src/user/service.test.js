const chai = require("chai");
const sinon = require("sinon");
const { UserRepository } = require("./repository");
const expect = chai.expect;
const faker = require("faker");
const { UserService } = require("./service");

describe("UserService", function () {
  describe("create", function () {
    it("should create a new user", async function () {
      const stubValue = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };

      const userRepo = new UserRepository();
      const stub = sinon.stub(userRepo, "create").returns(stubValue);

      const userService = new UserService(userRepo);
      const user = await userService.create(stubValue.name, stubValue.email);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.deep.equal(stubValue);
    });
  });

  describe("getUser", function () {
    it("should return a user that matches the provided id", async function () {
      const stubValue = {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };

      const userRepo = new UserRepository();
      const stub = sinon.stub(userRepo, "getUser").returns(stubValue);

      const userService = new UserService(userRepo);
      const user = await userService.getUser(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.deep.equal(stubValue);
    });
  });
});