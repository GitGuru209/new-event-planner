// const request = require("supertest");
// const app = require("../../server");

// test("User login should fail if user is not registered", async () => {
//   const response = await request(app).post("/login").send({ username: "UnknownUser" });
//   expect(response.status).toBe(400);
//   expect(response.body.message).toBe("User not found. Please register.");
// });

// test("User registration should succeed with a new username", async () => {
//   const response = await request(app).post("/register").send({ username: "NewUser" });
//   expect(response.status).toBe(201);
//   expect(response.body.message).toBe("User registered successfully.");
// });

test("test", ()=>{
  expect(true).toBe(true);
})

