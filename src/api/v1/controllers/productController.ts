import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles POST request to create new product
export const createProductHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {name, sku, quantity, price, category} = req.body;
        const productData = {name, sku, quantity, price, category};

        const newProduct = await productService.createProduct(productData);

        res.status(HTTP_STATUS.OK).json(successResponse({newProduct}, "Event created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

// handles GET request to read all events
export const getAllEventsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const products = await productService.getAllProducts;

        res.status(HTTP_STATUS.OK).json(successResponse({"count": products.length, products}, "Products retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};