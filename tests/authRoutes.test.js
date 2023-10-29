const request = require("supertest");
const app = require("../app");

describe("Auth Routes", () => {
  it("should sign up a user", async () => {
    const response = await request(app).post("/user/signup").send({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(302);
  });

  it("should redirect back to the signup page if user already exists during signup", async () => {
    const response = await request(app).post("/user/signup").send({
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/user/signup");
  });

  it("should log in a user", async () => {
    const response = await request(app).post("/user/login").send({
      email: "john@example.com",
      password: "password123",
    });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/blog");
  });

  it("should redirect back to the login page if wrong credentials supplied", async () => {
    const response = await request(app).post("/user/login").send({
      email: "nonexistent@example.com",
      password: "invalidpassword",
    });
    expect(response.statusCode).toBe(302);

    expect(response.headers.location).toBe("/user/login");
  });

  it("should log out a user", async () => {
    const response = await request(app).get("/user/logout");
    expect(response.statusCode).toBe(302);
  });
});
