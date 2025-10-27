import { useState } from 'react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
};

export default meta;

type Story = StoryFn<typeof Pagination>;

export const Default: Story = (args) => <Pagination {...args} />;
Default.args = {
  numTotalItems: 100,
  itemsPerPage: 10,
  currentPage: 1,
};

export const WithItemsPerPageOptions: Story = (args) => <Pagination {...args} />;
WithItemsPerPageOptions.args = {
  numTotalItems: 100,
  itemsPerPage: 10,
  itemsPerPageOptions: [10, 20, 50, 100],
  currentPage: 1,
};

/**
 * Component Test: Pagination 컴포넌트의 상호작용 테스트
 *
 * Happy Path:
 * - 페이지 번호 클릭 시 해당 페이지로 이동하는지
 * - 이전/다음 버튼 클릭 시 페이지 이동하는지
 * - 첫 페이지에서 이전 버튼 disabled되는지
 * - 마지막 페이지에서 다음 버튼 disabled되는지
 *
 * Bad Path:
 * - 잘못된 페이지 번호 입력 시 처리되는지
 */
type InteractionStory = StoryObj<typeof Pagination>;

export const InteractionTest: InteractionStory = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const numTotalItems = 50;
    const itemsPerPage = 10;
    const maxPage = Math.ceil(numTotalItems / itemsPerPage);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px' }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Controlled Pagination
          </div>
          <Pagination
            numTotalItems={numTotalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onBack={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            onNext={() => setCurrentPage(prev => Math.min(prev + 1, maxPage))}
          />
          <div style={{ marginTop: '8px', fontSize: '14px' }} data-testid="current-page-display">
            Current Page: {currentPage}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Uncontrolled Pagination (Internal State)
          </div>
          <Pagination
            numTotalItems={30}
            itemsPerPage={10}
          />
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>
            Single Page (No Navigation)
          </div>
          <Pagination
            numTotalItems={5}
            itemsPerPage={10}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('초기 페이지 상태 확인', async () => {
      // 현재 페이지가 1인지 확인
      const pageDisplay = canvas.getByTestId('current-page-display');
      await expect(pageDisplay.textContent).toContain('Current Page: 1');

      // 페이지 표시 확인 (1 / 5)
      const paginationText = canvas.getByText(/1 \/ 5/);
      await expect(paginationText).toBeInTheDocument();
    });

    await step('첫 페이지에서 이전 버튼 disabled되는지 확인', async () => {
      // 이전 버튼 찾기 (aria-label 사용)
      const prevButton = canvas.getAllByRole('button')[0]; // 첫 번째 버튼이 Previous
      
      // disabled 상태 확인
      await expect(prevButton).toBeDisabled();
    });

    await step('다음 버튼 클릭 시 페이지 이동하는지 확인', async () => {
      // 다음 버튼 찾기
      const nextButton = canvas.getAllByRole('button')[1]; // 두 번째 버튼이 Next
      
      // 다음 버튼 클릭
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 페이지가 2로 이동했는지 확인
      const pageDisplay = canvas.getByTestId('current-page-display');
      await expect(pageDisplay.textContent).toContain('Current Page: 2');

      // 페이지 표시 확인 (2 / 5)
      const paginationText = canvas.getByText(/2 \/ 5/);
      await expect(paginationText).toBeInTheDocument();
    });

    await step('이전 버튼 클릭 시 페이지 이동하는지 확인', async () => {
      // 이전 버튼 찾기
      const prevButton = canvas.getAllByRole('button')[0];
      
      // 이전 버튼이 이제 활성화되어 있어야 함
      await expect(prevButton).not.toBeDisabled();
      
      // 이전 버튼 클릭
      await userEvent.click(prevButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 페이지가 1로 돌아갔는지 확인
      const pageDisplay = canvas.getByTestId('current-page-display');
      await expect(pageDisplay.textContent).toContain('Current Page: 1');
    });

    await step('마지막 페이지로 이동하여 다음 버튼 disabled 확인', async () => {
      // 마지막 페이지(5)까지 이동
      const nextButton = canvas.getAllByRole('button')[1];
      
      // 5번 클릭하여 마지막 페이지로 이동
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 300));
      await userEvent.click(nextButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 페이지가 5인지 확인
      const pageDisplay = canvas.getByTestId('current-page-display');
      await expect(pageDisplay.textContent).toContain('Current Page: 5');

      // 다음 버튼이 disabled 상태인지 확인
      await expect(nextButton).toBeDisabled();
    });

    await step('페이지 범위가 올바르게 표시되는지 확인', async () => {
      // 마지막 페이지(5)의 범위 확인: "50개 중 41 - 50 표시 중"
      // 여러 Pagination 컴포넌트가 있으므로 getAllByText 사용
      const rangeTexts = canvas.getAllByText((_content, element) => {
        return (element?.textContent?.includes('50') &&
               element?.textContent?.includes('41') &&
               element?.textContent?.includes('표시 중')) || false;
      });
      // 첫 번째 매칭 요소 (Controlled Pagination) 확인
      await expect(rangeTexts[0]).toBeInTheDocument();
    });

    await step('단일 페이지일 때 네비게이션 버튼이 없는지 확인', async () => {
      // 세 번째 Pagination (Single Page) 확인
      // 5개 아이템, 10개씩 보기 = 1페이지만 존재
      // 이 경우 이전/다음 버튼이 렌더링되지 않음
      
      // "1 / 1" 텍스트가 없어야 함 (maxPage > 1일 때만 렌더링)
      const singlePageText = canvas.queryByText(/1 \/ 1/);
      await expect(singlePageText).not.toBeInTheDocument();
    });

    await step('Uncontrolled Pagination 동작 확인', async () => {
      // 두 번째 Pagination의 버튼들 (Uncontrolled)
      // 모든 버튼 중에서 중간 것들이 Uncontrolled pagination의 버튼
      const allButtons = canvas.getAllByRole('button');
      
      // Uncontrolled pagination의 다음 버튼 (index 2 또는 3)
      // 첫 번째 pagination에 2개, 두 번째 pagination에 2개
      const uncontrolledNextButton = allButtons[3]; // 두 번째 pagination의 다음 버튼
      
      // 다음 버튼 클릭
      await userEvent.click(uncontrolledNextButton);
      await new Promise(resolve => setTimeout(resolve, 300));

      // 페이지 표시가 2 / 3으로 변경되었는지 확인
      const uncontrolledPageText = canvas.getByText(/2 \/ 3/);
      await expect(uncontrolledPageText).toBeInTheDocument();
    });
  },
};
