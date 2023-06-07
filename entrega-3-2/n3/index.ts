// Utilitzant RabbitMQ com a element imprescindible crea una queue on una classe Publisher publiqui missatges que siguin llegits per una classe Subscriber. Mostra l'emissió i recepció de cada missatge en consoles diferents.

import Publisher from './publisher';
import Subscriber from './subscriber';

async function run() {
    const publisher = new Publisher();
    const subscriber = new Subscriber();

    await subscriber.subscribe('myQueue');
    await publisher.publish('Hello, RabbitMQ!', 'myQueue');
}

run().catch((error) => console.error('Error:', error));