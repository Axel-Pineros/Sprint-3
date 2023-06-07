import * as amqp from 'amqplib';

class Subscriber {
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

    public async subscribe(queueName: string) {
        try {
            await this.channel.assertQueue(queueName, { durable: false });
            this.channel.consume(queueName, (message) => {
                if (message) {
                    console.log(`[Subscriber] Received message: ${message.content.toString()}`);
                    this.channel.ack(message);
                }
            });
        } catch (error) {
            console.error('Error subscribing to queue', error);
        }
    }
}

export default Subscriber;