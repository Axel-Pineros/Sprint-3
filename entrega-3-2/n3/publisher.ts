import * as amqp from 'amqplib';

class Publisher {
    private connection!: amqp.Connection;
    private channel!: amqp.Channel;

    constructor() {
        this.connect();
    }

    private async connect() {
        try {
            this.connection = await amqp.connect('amqp://localhost');
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.error('Error connecting to RabbitMQ', error);
        }
    }

    public async publish(message: string, queueName: string) {
        try {
            await this.channel.assertQueue(queueName, { durable: false });
            this.channel.sendToQueue(queueName, Buffer.from(message));
            console.log(`[Publisher] Sent message: ${message}`);
        } catch (error) {
            console.error('Error publishing message', error);
        }
    }
}

export default Publisher;