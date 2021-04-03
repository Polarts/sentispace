Array.prototype.unique = function() {
    return this.filter(
        (value, index, self) => 
            self.indexOf(value) === index
    );
}

Array.prototype.remove = function(item: any) {
    for (let i=0; i<this.length; i++) {
        if (this[i] == item) {
            this.splice(i, 1);
            i--;
        }
    }  
}

Array.prototype.removef = function(item: any) {
    return this.filter(elem => elem !== item);
}

export {}