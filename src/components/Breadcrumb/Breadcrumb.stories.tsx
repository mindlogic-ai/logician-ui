import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { BreadcrumbItem } from './BreadcrumbItem';
import { BreadcrumbLink } from './BreadcrumbLink';
import { Breadcrumb } from './Breadcrumb';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
} as Meta<typeof Breadcrumb>;

const Template: StoryFn<typeof Breadcrumb> = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem isCurrentPage>
      <BreadcrumbLink href="/docs/breadcrumb">Breadcrumb</BreadcrumbLink>
    </BreadcrumbItem>
  </Breadcrumb>
);

export const Default = Template.bind({});
Default.args = {};

/**
 * Component Test: Breadcrumb 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - breadcrumb 아이템들이 올바르게 렌더링되는지
 * - 링크 클릭 시 네비게이션 작동하는지
 * - separator가 올바르게 표시되는지
 *
 * Bad Path:
 * - 빈 breadcrumb 리스트일 때 처리되는지
 */
type InteractionStory = StoryObj<typeof Breadcrumb>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [clickedLink, setClickedLink] = useState<string>('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Normal Breadcrumb
          </div>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setClickedLink('Home'); }}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setClickedLink('Docs'); }}>
                Docs
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={(e) => { e.preventDefault(); setClickedLink('Components'); }}>
                Components
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {clickedLink && (
            <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="clicked-link">
              Clicked: {clickedLink}
            </div>
          )}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Custom Separator Breadcrumb
          </div>
          <Breadcrumb separator="-">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">About</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Contact</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Empty Breadcrumb (No items)
          </div>
          <Breadcrumb data-testid="empty-breadcrumb">
            {/* No items */}
          </Breadcrumb>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Single Item Breadcrumb (No separator)
          </div>
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('breadcrumb 아이템들이 올바르게 렌더링되는지 확인', async () => {
      // 첫 번째 Breadcrumb (Normal Breadcrumb) 내의 링크들을 확인
      const homeLinks = canvas.getAllByText('Home');
      const docsLink = canvas.getByText('Docs');
      const componentsLink = canvas.getByText('Components');
      const breadcrumbLinks = canvas.getAllByText('Breadcrumb');

      // 첫 번째 Breadcrumb의 Home 링크 (여러 개 중 첫 번째)
      await expect(homeLinks[0]).toBeInTheDocument();
      await expect(docsLink).toBeInTheDocument();
      await expect(componentsLink).toBeInTheDocument();
      await expect(breadcrumbLinks[0]).toBeInTheDocument();
    });

    await step('링크 클릭 시 네비게이션 작동하는지 확인', async () => {
      // 첫 번째 Breadcrumb의 Home 링크 클릭 (getAllByText로 찾아서 첫 번째 선택)
      const homeLinks = canvas.getAllByText('Home');
      await userEvent.click(homeLinks[0]);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 클릭된 링크 확인
      let clickedDisplay = canvas.getByTestId('clicked-link');
      await expect(clickedDisplay.textContent).toContain('Home');

      // Docs 링크 클릭
      const docsLink = canvas.getByText('Docs');
      await userEvent.click(docsLink);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 클릭된 링크 확인
      clickedDisplay = canvas.getByTestId('clicked-link');
      await expect(clickedDisplay.textContent).toContain('Docs');

      // Components 링크 클릭
      const componentsLink = canvas.getByText('Components');
      await userEvent.click(componentsLink);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 클릭된 링크 확인
      clickedDisplay = canvas.getByTestId('clicked-link');
      await expect(clickedDisplay.textContent).toContain('Components');
    });

    await step('separator가 올바르게 표시되는지 확인', async () => {
      // 기본 separator (chevron icon)
      const breadcrumbNav = canvas.getAllByRole('navigation')[0];
      // Breadcrumb은 nav > ol > li 구조
      const listItems = breadcrumbNav.querySelectorAll('li');
      
      // 4개의 아이템이 있어야 함
      await expect(listItems.length).toBe(4);

      // separator span 요소들이 있는지 확인 (아이템 사이에 3개)
      const separators = breadcrumbNav.querySelectorAll('span[role="presentation"]');
      // 4개 아이템 사이에 3개의 separator
      await expect(separators.length).toBeGreaterThanOrEqual(3);
    });

    await step('custom separator가 올바르게 표시되는지 확인', async () => {
      // Custom separator ("-") 확인
      const customBreadcrumb = canvas.getAllByRole('navigation')[1];
      
      // "-" 텍스트가 포함되어 있는지 확인
      await expect(customBreadcrumb.textContent).toContain('-');
    });

    await step('빈 breadcrumb 리스트일 때 처리되는지 확인', async () => {
      // Empty breadcrumb이 존재하고 에러 없이 렌더링되는지 확인
      const emptyBreadcrumb = canvas.getByTestId('empty-breadcrumb');
      await expect(emptyBreadcrumb).toBeInTheDocument();
      
      // nav 요소가 있는지 확인
      await expect(emptyBreadcrumb.tagName).toBe('NAV');
    });

    await step('단일 아이템 breadcrumb에 separator가 없는지 확인', async () => {
      // Single item breadcrumb
      const singleItemNav = canvas.getAllByRole('navigation')[3];
      const listItems = singleItemNav.querySelectorAll('li');

      // 1개의 아이템만 있어야 함
      await expect(listItems.length).toBe(1);

      // separator가 없어야 함
      const separators = singleItemNav.querySelectorAll('span[role="presentation"]');
      await expect(separators.length).toBe(0);
    });

    await step('isCurrentPage 링크가 렌더링되는지 확인', async () => {
      // 첫 번째 Breadcrumb의 현재 페이지 링크 찾기
      const currentPageLinks = canvas.getAllByText('Breadcrumb');
      const firstCurrentLink = currentPageLinks[0];

      // 현재 페이지 링크가 존재하는지 확인
      await expect(firstCurrentLink).toBeInTheDocument();
    });
  },
};
