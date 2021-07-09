/**
 * @param array to scan
 * @returns an array with only unique items in it
 */
export function unique<T>(array: T[]) {
    return array.filter(
        (value, index, self) => 
            self.indexOf(value) === index
    );
}

/**
 * @param array to scan
 * @param items to remove
 * @returns array without given items
 */
export function without<T>(array: T[], ...items: T[]) {
    return array.filter(elem => !items.includes(elem));
}