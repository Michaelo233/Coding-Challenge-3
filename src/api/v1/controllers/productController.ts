import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

// handles POST request to create new product
export const createEventHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const event = await productService.createProduct(req.body);
    res
      .status(HTTP_STATUS.CREATED)
      .json(successResponse(event, "Event created successfully"));
  } catch (error) {
    next(error);
  }
};