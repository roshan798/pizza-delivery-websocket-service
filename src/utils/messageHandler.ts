import { getLogger } from "../common/factory";
import ws from "../socket"
import { Events } from "../types/socketEvents";
export class MessageHandler {
    logger = getLogger()
    constructor() {

    }
    async consumeProductMessage(topic: string, partition: number, message: string): Promise<void> {
        console.log(message)
    }
    async consumeToppingMessage(topic: string, partition: number, message: string): Promise<void> {
        console.log(message)
    }
    async consumeOrderMessage(topic: string, partition: number, message: string): Promise<void> {
        const order = JSON.parse(message);
        this.logger.info(`Received order message for tenant ${order.data.tenantId}:`, order);
        ws.io.to(order.data.tenantId).emit(Events.ORDER_UPDATE, order);
    }
}
