declare interface Array<T> {

    /**
     * Returns an array with only unique items in it.
     */
    unique(): Array<T>;

    /**
     * Removes an item from an array using splice (unchainable)
     * @param item The item to remove
     */
    remove(item: T): void;

    /**
     * Removes an item from an array using filter (chaninable)
     * @param item The item to remove
     */
    removef(item: T): Array<T>;
}