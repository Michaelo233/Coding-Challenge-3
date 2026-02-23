import { Product } from "../models/productModels";
import * as firestoreRepository from "../repositories/firestoreRepository";
// import { eventSchemas } from "../validation/eventSchemas";
// import { validateRequest } from "../middleWare/validate";

const COLLECTION = "products";

// creating new product 
export const createProduct = async (
    eventData: {
        name: string, 
        sku: string, 
        quantiy: number
        price: number,
        category: string

    }): Promise<Product> => {
    try {

        const products = await firestoreRepository.getAllDocuments<Product>(COLLECTION)
        const newProductData = {
            id: products, 
            name: eventData.name,
            category: eventData.category ?? "general",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        
        const eventId = await firestoreRepository.createDocument<Event>(COLLECTION, newEventData);
        
        return {eventId, ... newEventData} as Event;
        
    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create event: ${errorMessage}`
        );
    }
};