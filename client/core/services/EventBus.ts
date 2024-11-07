export class EventBus {
    listeners = {};

    on(event: string, callback: () => void): () =>  void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        const unsubscribe = () => {
            const index = this.listeners[event].findIndex((cb) => cb === callback);    
            this.listeners[event].splice(index, 1);
        }

        this.listeners[event].push(callback);

        return unsubscribe
    }

    off(event: string, callback: () => void): void {
        const index = this.listeners[event].findIndex((cb) => cb === callback);    
        this.listeners[event].splice(index, 1);
    }

    emit(event, data): void {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach((callback) => {
            callback(data);
        });
    }
}

export default new EventBus();