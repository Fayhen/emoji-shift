export interface AllEmojis {
  hearts: [string, string][];
  flowers: [string, string][];
}

export interface ActiveEmoji {
  position: number,
  codepoint: string,
  label: string,
  category: string
};
