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
     * Filters given items out of an array and returns an array without them (chaninable)
     * @param items The items to remove
     */
    without(...items: T[]): Array<T>;
}