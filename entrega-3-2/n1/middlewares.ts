class Middlewares {
    square(num: number): number {
        const result = num * num;
        console.log(`Square middleware: ${num} ^ 2 = ${result}`);
        return result;
    }

    cube(num: number): number {
        const result = num * num * num;
        console.log(`Cube middleware: ${num} ^ 3 = ${result}`);
        return result;
    }

    divideByTwo(num: number): number {
        const result = num / 2;
        console.log(`Divide by two middleware: ${num} / 2 = ${result}`);
        return result;
    }
}

export default Middlewares;