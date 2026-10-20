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

describe('PageLoader status', () => {
  it('an idle loader exposes no status', () => {
    withTheme(<PageLoader isLoading={false} />);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('while loading, the status carries its label as text content', () => {
    withTheme(<PageLoader isLoading />);
    // Live regions announce text, not aria-label.
    expect(screen.getByRole('status').textContent).toBe('로딩 중');
  });

  it('label overrides the announced text', () => {
    withTheme(<PageLoader isLoading label="Saving" />);
    expect(screen.getByRole('status')).toHaveTextContent('Saving');
  });
});

describe('SectionLoader', () => {
  it('while loading, the status carries its label as text content', () => {
    withTheme(<SectionLoader isLoading />);
    expect(screen.getByRole('status').textContent).toBe('로딩 중');
  });

  it('renders nothing when not loading', () => {
    const { container } = withTheme(<SectionLoader isLoading={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a status region with the thinking dots variant', () => {
    withTheme(<SectionLoader isLoading variant="thinking" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
