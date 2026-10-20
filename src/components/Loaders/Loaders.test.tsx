import { ChakraProvider } from '@chakra-ui/react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { system } from '@/theme';

import { PageLoader } from './PageLoader';
import { SectionLoader } from './SectionLoader';

const withTheme = (ui: React.ReactElement) =>
  render(<ChakraProvider value={system}>{ui}</ChakraProvider>);

describe('PageLoader', () => {
  it('renders a status region', () => {
    withTheme(<PageLoader isLoading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders three thinking dots for variant="thinking"', () => {
    const { container } = withTheme(
      <PageLoader isLoading variant="thinking" />
    );
    // Spinner is absent; three dots render instead.
    expect(container.querySelectorAll('[aria-hidden="true"] > *')).toHaveLength(
      3
    );
  });
});

describe('SectionLoader', () => {
  it('renders nothing when not loading', () => {
    const { container } = withTheme(<SectionLoader isLoading={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a status region with the thinking dots variant', () => {
    withTheme(<SectionLoader isLoading variant="thinking" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
