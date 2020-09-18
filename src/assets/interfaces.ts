export interface AllEmojis {
  hearts: [string, string][];
  flowers: [string, string][];
  animals: [string, string][];
  fruits: [string, string][];
  food: [string, string][];
  astra: [string, string][];
}

export interface ActiveEmoji {
  position: number,
  codepoint: string,
  label: string,
  category: string
};
