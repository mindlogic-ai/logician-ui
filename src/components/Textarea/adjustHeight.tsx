export const adjustHeight = (
  textareaRef: React.RefObject<HTMLTextAreaElement>
) => {
  const textarea = textareaRef.current;
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
};
