export const hasAllCharsWithOrder = (wordA: string, wordB: string) => {
    let lastFoundIndex = -1;
    const charsB = wordB.split('');
    return charsB.every(char => {
        const index = wordA.indexOf(char);
        if (index > -1 && index > lastFoundIndex) {
            lastFoundIndex = index;
            return true;
        }
        return false;
    });
}