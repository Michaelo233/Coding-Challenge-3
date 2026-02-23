import express from "express";
import { validateRequest } from "../middleware/validate";
import * as productController from "../controllers/productController";
import { productSchemas } from "../validation/productSchemas";

const router = express.Router();

router.post("/", validateRequest(productSchemas.create), productController.createProductHandler);