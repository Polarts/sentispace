
export type MessageCallback = (payload?: any) => void;

export enum Message {
    actSelected,
    actDeselectAll,
}

export interface IMessageCallback {
    message: Message;
    callback: (payload?: any) => void;
}

export default class MessagingService {

    //#region properties

    public callbacks: { [msgID: number]: MessageCallback[] } = {};

    //#endregion

    //#region singleton

    private static _instance: MessagingService;

    private constructor(){}

    public static get instance(){ 
        return this._instance ?? (this._instance = new MessagingService()); 
    }

    //#endregion

    //#region methods

    public register(message: Message, callback: MessageCallback): number {
        const msgID = message as number;
        if (msgID in this.callbacks) {
            this.callbacks[msgID].push(callback);
        } else {
            this.callbacks[msgID] = [callback];
        }
        return this.callbacks[msgID].length - 1;
    }

    public unregister(message: Message, index: number): boolean {
        const msgID = message as number;
        if (msgID in this.callbacks) {
            this.callbacks[msgID].splice(index, 1);
            return true;
        } else {
            return false;
        } 
    }

    public send(message: Message, payload?: any) {
        const msgID = message as number;
        if (msgID in this.callbacks) {
            this.callbacks[msgID].forEach(callback => callback(payload));
        }
    }

    //#endregion

}