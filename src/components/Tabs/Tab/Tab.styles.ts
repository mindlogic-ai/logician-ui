import * as CSS from 'csstype';

// TODO: investigate why these TS issues are coming up
export const verticalStyles = {
  borderInlineStart: 'none',
  position: 'relative' as CSS.Property.Position,
  justifyContent: 'flex-start',
  alignItems: 'center',
  textAlign: 'left' as CSS.Property.TextAlign,
  p: 4,
  width: '100%',
};

export const horizontalSelectedStyles = {
  color: 'primary.main',
  fontWeight: 'semibold',
  position: 'relative',
  _after: {
    content: '""',
    position: 'absolute',
    top: 'calc(100% - 1px)',
    left: 0,
    width: '100%',
    height: '2px',
    background: 'primary.main',
  },
};

export const verticalSelectedStyles = {
  backgroundColor: 'primary.lightest', // #E8EEFB
  color: 'primary.dark', // #0D317D
  fontWeight: 'bold',
};
