export const capitalizeLetter = (text) => {
  const words = text.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    if (word.length === 0) {
      return word; // Handle empty words
    }
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });

  // Join the capitalized words back into a string
  const capitalizedString = capitalizedWords.join(" ");

  return capitalizedString;
};
