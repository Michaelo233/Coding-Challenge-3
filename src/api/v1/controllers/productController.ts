// creating new event 
export const createEvent = async (
    eventData: {
        name: string, 
        date: string, 
        capacity: number
        resgistrationCount?: number,
        status?: string,
        category?: string

    }): Promise<Event> => {
    try {

        const events = await firestoreRepository.getAllDocuments<Event>(COLLECTION)
        const newEventData = {
            id: "evt_00000" + (events.length + 1).toString(), 
            name: eventData.name,
            date: eventData.date,
            capacity: eventData.capacity,
            resgistrationCount: eventData.resgistrationCount ?? 0,
            status: eventData.status ?? "active",
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