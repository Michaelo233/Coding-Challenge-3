import { Product } from "../models/productModels";
import * as firestoreRepository from "../repositories/firestoreRepository";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const COLLECTION = "products";

// creating new product 
export const createProduct = async (
    productData: {
        name: string, 
        sku: string, 
        quantiy: number
        price: number,
        category: string

    }): Promise<Product> => {
    try {

        const products = await firestoreRepository.getAllDocuments<Product>(COLLECTION)
        const newProductData = {
            id: "prod_00" + (products.length).toString(), 
            name: productData.name,
            sku: productData.sku,
            quantity: productData.quantiy,
            price: productData.price,
            category: productData.category,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        
        // const productId = await firestoreRepository.createDocument<Product>(COLLECTION, newProductData);
        
        return {... newProductData} as Product;
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create event: ${errorMessage}`
        );
    }
};

// to get all event in a collection 
export const getAllProducts = async (): Promise<Product[]> => {
    try {
        // const event = await firestoreRepository.createDocument<Event>(COLLECTION, newEventData);
        const products = await firestoreRepository.getAllDocuments<Product>(COLLECTION);

        return products;

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to retrieve all products: ${errorMessage}`
        );
    }
};