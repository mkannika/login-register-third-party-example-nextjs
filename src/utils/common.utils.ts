/**
 * Extracts the username part from an email address.
 * Returns undefined if the input is not a valid email.
 */
export function usernameFromEmail(email?: string): string | undefined {
  if (typeof email === "string" && email.includes("@")) {
    return email.split("@")[0] ?? "Unknown User";
  }
  return "Unknown User";
}

/**
 * Checks if a given string is a valid URL.
 * Returns true if the string is a valid URL, false otherwise.
 */
export function isValidUrl(url?: string): boolean {
  try {
    if (!url) return false;
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Randomly generates a color in hex format for a placeholder image.
 * @returns {string} - A hex color string with url format.
 * @example "https://placehold.co/250x250/FF6347/FFFFFF?text=PlayNAKA"
 */
export function generatePlaceholderImageUrl(text: string): string {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `https://placehold.co/250x250/${randomColor}/FFFFFF?text=${text}`;
}
