function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  function capitalizeTheFirstLetterOfEachWord(words,sep=' ') {
    var separateWord = words.toLowerCase().split(sep);
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }
export {
    capitalizeFirstLetter,
    capitalizeTheFirstLetterOfEachWord
}