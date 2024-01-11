export function capitalizeFirstLetter(word) {
    if (typeof word !== 'string') {
        throw new TypeError('Input must be a string');
    }

    if (word.length === 0) {
        return word;
    }

    const firstLetter = word[0].toUpperCase();
    const restOfWord = word.slice(1);

    return firstLetter + restOfWord;
}