import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleWare/validate";
import Joi from "joi";

describe("validateRequest Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    // We'll add our test setup and test cases here

    // test case # 1: validate valid body input
    it("should pass for valid body input", () => {
        // Arrange
        const testSchemas = {
            body: Joi.object({
                name: Joi.string().min(2).required().max(80),
                sku: Joi.string().pattern(/^[A-Z]{3}[0-9]{4}$/).required(),
                quantity: Joi.number().integer().min(0).required(),
                price: Joi.number().required().positive().precision(2),
                category: Joi.string().required().valid("electronics", "clothing", "food", "tools", "other")
            }),
        };
        mockReq.body = { name: "Duncan MacLeod", sku: "ABC1234", quantity: 3, price: 300, category: "tool" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    // test case # 2: invalid input
    it("should fail for invalid body input", () => {
        // Arrange
        const testSchemas = {
            body: Joi.object({
                name: Joi.string().min(2).required().max(80),
                sku: Joi.string().pattern(/^[A-Z]{3}[0-9]{4}$/).required(),
                quantity: Joi.number().integer().min(0).required(),
                price: Joi.number().required().positive().precision(2),
                category: Joi.string().required().valid("electronics", "clothing", "food", "tools", "other")
            }),
        };

        // Age is out of range
        mockReq.body = { name: "Dudd" };
        const middleware = validateRequest(testSchemas);

        // Act
        middleware(mockReq as Request, mockRes as Response, mockNext);

        // Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation error"),
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

});