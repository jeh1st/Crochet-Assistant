
export const convertTextToUK = (text: string): string => {
  // Regex to match US terms. Longer phrases must come first to avoid partial matches.
  // Added capturing group (s?) for plural forms.
  const pattern = /\b(half double crochet|single crochet|double crochet|treble crochet|yarn over|hdc|sc|dc|tr|yo)(s?)\b/gi;

  return text.replace(pattern, (match, p1, p2) => {
    const lower = p1.toLowerCase();
    let replacement = p1;

    switch (lower) {
      case 'single crochet': replacement = 'double crochet'; break;
      case 'double crochet': replacement = 'treble crochet'; break;
      case 'half double crochet': replacement = 'half treble crochet'; break;
      case 'treble crochet': replacement = 'double treble crochet'; break;
      case 'yarn over': replacement = 'yarn round hook'; break;
      case 'sc': replacement = 'dc'; break;
      case 'dc': replacement = 'tr'; break;
      case 'hdc': replacement = 'htr'; break;
      case 'tr': replacement = 'dtr'; break;
      case 'yo': replacement = 'yrh'; break;
      default: return match; // If unknown, return full match (shouldn't happen due to regex)
    }

    // Preserve casing based on the main term (p1)
    if (p1 === p1.toUpperCase()) {
      replacement = replacement.toUpperCase();
    } else if (p1[0] === p1[0].toUpperCase()) {
      // Title case/Sentence case: Capitalize first letter
      replacement = replacement.charAt(0).toUpperCase() + replacement.slice(1);
    }

    // Append the suffix (e.g., 's')
    return replacement + p2;
  });
};
