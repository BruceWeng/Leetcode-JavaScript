const canConstruct = (ransomNote, magazine) => {
    let charCount = new Array(26).fill(0);
    for (let i = 0; i < magazine.length; i++) {
        charCount[magazine[i].charCodeAt() - "a".charCodeAt()] += 1;
    }

    for (let j = 0; j < ransomNote.length; j++) {
        charCount[ransomNote[j].charCodeAt() - "a".charCodeAt()] -= 1;
        if (charCount[ransomNote[j].charCodeAt() - "a".charCodeAt()] < 0) {
            return false;
        }
    }

    return true;
}
