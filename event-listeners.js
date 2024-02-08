
/**
 * A group of event listeners which can all be called at once. The listeners are regular function objects.
 * The number of arguments must be the same for all listeners.  
 */
export class EventListeners {
    listeners = []
    
    constructor(argumentsLength = 0) {
        this.argumentsLength = argumentsLength
    }

    /**
     * Add the event listener.
     * @param {Function} listener 
     */
    add(listener) {

        if (listener.length !== this.argumentsLength) {
            throw new Error('The number of arguments must match argumentsLength: ', this.argumentsLength)
        }

        this.listeners.push(listener)
    }

    /**
     * Remove the event listener.
     * @param {Function} listener 
     */
    remove(listener) {
        const index = this.listeners.indexOf(listener)
        if (index === -1) { 
            throw new Error(`Cannot remove event listener ${listener} because it is not in group`)
        }
        this.listeners.splice(index, 1)
    }

    /**
     * Notify the listeners that an event has occurred.
     * @param  {...any} args the arguments of the event. Length must match argumentsLength.
     */
    fire(...args) {
        if (args.length !== this.argumentsLength) {
            throw new Error(`Length of arguments must match. Got: ${args}, expected: ${this.argumentsLength}`)
        }

        // Call the listeners.
        this.listeners.forEach((listener) => {
            listener(...args)
        })
    }
}