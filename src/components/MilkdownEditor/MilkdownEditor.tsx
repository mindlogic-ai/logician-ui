import { MutableRefObject, useLayoutEffect, useRef } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { Crepe } from '@milkdown/crepe';

import '@milkdown/crepe/theme/common/style.css';
import '@milkdown/crepe/theme/frame.css';
import './MilkdownEditor.css';

import type { MilkdownEditorProps } from './MilkdownEditor.types';

export function MilkdownEditor({
  defaultValue,
  onChange,
  ...rest
}: MilkdownEditorProps & BoxProps) {
  const crepeRef = useRef<Crepe>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const loading = useRef<boolean>(false);

  useLayoutEffect(() => {
    if (!divRef.current || loading.current) return;

    loading.current = true;
    const crepe = new Crepe({
      root: divRef.current,
      defaultValue: defaultValue ?? '',
    });

    crepe.create().then(() => {
      (crepeRef as MutableRefObject<Crepe>).current = crepe;
      loading.current = false;
    });

    return () => {
      if (loading.current) return;
      crepe.destroy();
    };
  }, [onChange]);

  return <Box ref={divRef} {...rest} />;
}
