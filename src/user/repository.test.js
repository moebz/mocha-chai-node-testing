const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("faker");
const { UserModel } = require("../database");
const { UserRepository } = require("./repository");

describe("UserRepository", function () {
  const stubValue = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
  describe("create", function () {
    it("should add a new user", async function () {
      const stubValue = {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };

      const stub = sinon.stub(UserModel, "create").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.create(stubValue.name, stubValue.email);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.deep.equal(stubValue);
    });
  });

  describe("getUser", function () {
    it("should retrieve a user with specific id", async function () {
      const stub = sinon.stub(UserModel, "findOne").returns(stubValue);
      const userRepository = new UserRepository();
      const user = await userRepository.getUser(stubValue.id);

      expect(stub.calledOnce).to.be.true;
      expect(user).to.deep.equal(stubValue);
    });
  });
});
