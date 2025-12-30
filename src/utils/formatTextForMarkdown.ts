export const formatForMarkdown = (text: string): string => {
  return text?.replace(/\\n/g, '  \n'); // Convert single `\n` to a Markdown-compatible line break
};
