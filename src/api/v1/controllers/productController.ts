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