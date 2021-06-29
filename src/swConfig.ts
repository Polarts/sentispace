import { Config } from "./serviceWorkerRegistration";


export default class SWConfig implements Config {

    onUpdate(registration: ServiceWorkerRegistration) {
        if ('serviceWorker' in navigator && navigator.onLine) {
            registration.unregister().then(() => {
                window.location.reload();
            });
        }
    }

}