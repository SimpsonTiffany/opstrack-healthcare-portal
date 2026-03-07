require("dotenv").config();
const request = require("supertest");
const express = require("express");
const authRoutes = require("../routes/auth");
const sequelize = require("../config/database");
require("../models/User");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Auth Routes", () => {
    test("should register a user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                username: "testuser",
                password: "123456",
                role: "admin"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe("testuser");
    });

    test("should login a user", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                username: "testuser",
                password: "123456"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
test("should reject login with invalid credentials", async () => {
    const res = await request(app)
        .post("/api/auth/login")
        .send({
            username: "wronguser",
            password: "wrongpass"
        });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBeDefined();
});