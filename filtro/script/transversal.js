function zip(...arrays) {
    const length = Math.min(...arrays.map(arr => arr.length));
    const zipped = [];

    for (let i = 0; i < length; i++) {
        zipped.push(arrays.map(arr => arr[i]));
    }

    return zipped;
}