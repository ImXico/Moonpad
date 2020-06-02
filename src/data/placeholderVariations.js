/**
 * Holds the set of possible placeholder text snippets that may appear on empty tabs.
 * @private
 */
const PlaceholderTextVariations = [
  `Did you know Ctrl/Cmd+N opens a new tab?`,
  `Ctrl/Cmd+E will toggle-open the tab area.`,
  `FYI: You can move tabs up and down.`,
  `Have cool feedback? Open an issue on GitHub!`,
  `Type, type away like no one's watching!`,
  `Can't wait to see your calligraphy!`,
  `Your stuff is auto-saved, no worries.`,
  `Go on, it's all yours!`,
];

/**
 * Gets a pseudo-random entry from the PlaceholderTextVariations array.
 * @returns string entry.
 */
export const getRandomPlaceholderTextVariation = () => {
  return PlaceholderTextVariations[Math.floor(Math.random() * PlaceholderTextVariations.length)];
}
