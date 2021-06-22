import { Config } from "./serviceWorkerRegistration";


export default class SWConfig implements Config {

    constructor(public updateReady?: () => void) {}

    onUpdate(registration: ServiceWorkerRegistration) {
        if ('serviceWorker' in navigator) {
            registration.unregister().then(() => {
                if (!!this.updateReady)
                    this.updateReady();
            });
        }
    }

}