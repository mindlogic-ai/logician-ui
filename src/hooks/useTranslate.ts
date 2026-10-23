'use client';
import { useCallback } from 'react';

import defaultTranslations from '../translations/Defaults.translations.json';
import { formatForMarkdown } from '../utils/formatTextForMarkdown';
import { NO_PROVIDER_LANGUAGE, useLanguage } from './useLanguage';

const DEFAULT_LOCALE = 'ko';

// Given a block of text and variables, replaces instances of the provided variables in the text
const replaceVariables = (text: string, variables?: { [key: string]: any }) => {
  if (!variables) return formatForMarkdown(text);

  const regex = /({(.*?)})/gi;

  const potentialKeys: string[] = text.match(regex) ?? [];
  const textParts: Array<string> = [];
  let lastIndex = 0;
  potentialKeys.forEach((potentialKey: string) => {
    const keyIndex = text.indexOf(potentialKey);
    // Push stuff up to potential key
    textParts.push(text.slice(lastIndex, keyIndex));
    // Push potential key
    textParts.push(text.slice(keyIndex, keyIndex + potentialKey.length));
    lastIndex = keyIndex + potentialKey.length;
  });
  // Push remaining
  textParts.push(text.slice(lastIndex));

  const parts = textParts.map(
    (partText: string) =>
      // Slice to remove { and }
      variables[partText.slice(1, partText.length - 1)] ??
      formatForMarkdown(partText)
  );

  return parts.every((part) => typeof part === 'string')
    ? parts.join('')
    : parts;
};

export const useTranslate = (translations = {}) => {
  // Follow `LogicianProvider`'s `language`, the same one the date pickers
  // read. Outside a provider there is nothing to follow, so the library keeps
  // its historical Korean.
  const context = useLanguage();
  const userLanguage =
    context === NO_PROVIDER_LANGUAGE ? DEFAULT_LOCALE : context.language;
  return useCallback(
    (key: string, variables?: { [key: string]: any }) => {
      const locale = (userLanguage as string) ?? DEFAULT_LOCALE;
      const translation: string =
        { ...defaultTranslations, ...translations }[key]?.[locale] ?? key;
      const finalRes = replaceVariables(translation, variables);
      return finalRes;
    },
    [userLanguage, translations]
  );
};
