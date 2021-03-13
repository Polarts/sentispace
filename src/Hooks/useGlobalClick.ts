import ActivitiesStore from "../Stores/ActivitiesStore";

var didAddGlobalClick = false;
const globalClickListeners: Array<() => void> = [];

function documentClicked() {
    globalClickListeners.forEach(callback => callback());
}

export default function useGlobalClick(callback: () => void) {
    if (!didAddGlobalClick) {
        document.addEventListener('click', documentClicked);
        didAddGlobalClick = true;
    }
    globalClickListeners.push(callback);

    return () => {
        const index = globalClickListeners.indexOf(callback);
        if (index > -1) {
            globalClickListeners.slice(index, 1);
        }
    };
}