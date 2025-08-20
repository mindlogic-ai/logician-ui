import theme from '@/theme/index';

export const fileContainerStyles = {
  maxWidth: '480px',
  gap: 4,
  border: 'none',
};

export const fileNameStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%', // 필요에 따라 최대 너비 설정
};

export const fileSecondBoxStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
};

export const fileDeleteButtonStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translate(50%, -50%)',
  padding: theme.spacing[4],
  bg: theme.colors.danger.main, // 배경색
  color: 'white', // 아이콘 색상
  _hover: { bg: 'danger.main' },
};

export const fileProgressStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  size: 'xs',
  height: '4px',
  bg: 'gray.200',
  border: 'none',
};

export const errorStyles = {
  color: 'red',
};

export const getDetailStyles = (isError?: boolean) =>
  isError ? errorStyles : {};
