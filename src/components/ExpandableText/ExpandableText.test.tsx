import { render, screen } from '@testing-library/react';
import ExpandableText from './ExpandableText';
import i18next from '@/i18n/client';
import I18nextWrapper from '@/test-utils/I18nextWrapper';

jest.mock<typeof import('next/navigation')>('next/navigation');

describe('ExpandableText tests', () => {
	beforeEach(() => {
		Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
			configurable: true,
			value: 200,
		});
		jest.spyOn(window, 'getComputedStyle').mockReturnValue(
			{ lineHeight: '20px' } as CSSStyleDeclaration
		);
	});

	it('is rendered correctly', async () => {
		const dictionary = {
			collapseButton: 'Collapse',
			expandButton: 'Expand',
		};

		render(
			<ExpandableText
				dictionary={dictionary}
				testId='test-expandable-text'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellat adipisci et, eligendi ducimus accusamus consectetur, labore iusto esse, ratione pariatur laboriosam. Repudiandae, provident aspernatur. Adipisci nisi veniam incidunt tempore
			</ExpandableText>,
			{ wrapper: I18nextWrapper }
		);

		await screen.findByTestId<HTMLDivElement>('test-expandable-text');
		expect(screen.getByTestId<HTMLDivElement>('test-expandable-text')).toBeInTheDocument();
	});

	it('is a basic snapshot', async () => {
		const dictionary = {
			collapseButton: 'Collapse',
			expandButton: 'Expand',
		};

		render(
			<ExpandableText
				dictionary={dictionary}
				testId='test-expandable-text'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellat adipisci et, eligendi ducimus accusamus consectetur, labore iusto esse, ratione pariatur laboriosam. Repudiandae, provident aspernatur. Adipisci nisi veniam incidunt tempore
			</ExpandableText>
		);

		await screen.findByTestId<HTMLDivElement>('test-expandable-text');
		expect(screen.getByTestId<HTMLDivElement>('test-expandable-text')).toMatchSnapshot();
	});

	it('is a snapshot with defaultExpanded set to true', async () => {
		const dictionary = {
			collapseButton: 'Collapse',
			expandButton: 'Expand',
		};

		render(
			<ExpandableText
				dictionary={dictionary}
				testId='test-expandable-text'
				defaultExpanded
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellat adipisci et, eligendi ducimus accusamus consectetur, labore iusto esse, ratione pariatur laboriosam. Repudiandae, provident aspernatur. Adipisci nisi veniam incidunt tempore
			</ExpandableText>
		);

		await screen.findByTestId<HTMLDivElement>('test-expandable-text');
		expect(screen.getByTestId<HTMLDivElement>('test-expandable-text')).toMatchSnapshot();
	});
});

describe('ExpandableText integration tests', () => {
	beforeEach(() => {
		Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
			configurable: true,
			value: 200,
		});
		jest.spyOn(window, 'getComputedStyle').mockReturnValue(
			{ lineHeight: '20px' } as CSSStyleDeclaration
		);
	});

	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('expandableText.expandButton'));

		const dictionary = {
			collapseButton: i18next.t('expandableText.collapseButton'),
			expandButton: i18next.t('expandableText.expandButton'),
		};

		render(
			<ExpandableText
				dictionary={dictionary}
				testId='test-expandable-text'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellat adipisci et, eligendi ducimus accusamus consectetur, labore iusto esse, ratione pariatur laboriosam. Repudiandae, provident aspernatur. Adipisci nisi veniam incidunt tempore
			</ExpandableText>,
			{ wrapper: I18nextWrapper }
		);

		await screen.findByTestId<HTMLDivElement>('test-expandable-text');
		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('expandableText.expandButton'));

		const dictionary = {
			collapseButton: i18next.t('expandableText.collapseButton'),
			expandButton: i18next.t('expandableText.expandButton'),
		};

		render(
			<ExpandableText
				dictionary={dictionary}
				testId='test-expandable-text'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellat adipisci et, eligendi ducimus accusamus consectetur, labore iusto esse, ratione pariatur laboriosam. Repudiandae, provident aspernatur. Adipisci nisi veniam incidunt tempore
			</ExpandableText>,
			{ wrapper: I18nextWrapper }
		);

		await screen.findByTestId<HTMLDivElement>('test-expandable-text');
		expect(screen.getByText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');

		const dictionary = {
			collapseButton: i18next.t('expandableText.collapseButton'),
			expandButton: i18next.t('expandableText.expandButton'),
		};

		render(
			<ExpandableText
				dictionary={dictionary}
				testId='test-expandable-text'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellat adipisci et, eligendi ducimus accusamus consectetur, labore iusto esse, ratione pariatur laboriosam. Repudiandae, provident aspernatur. Adipisci nisi veniam incidunt tempore
			</ExpandableText>,
			{ wrapper: I18nextWrapper }
		);

		await screen.findByTestId<HTMLDivElement>('test-expandable-text');
		expect(screen.getByTestId<HTMLDivElement>('test-expandable-text')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');

		const dictionary = {
			collapseButton: i18next.t('expandableText.collapseButton'),
			expandButton: i18next.t('expandableText.expandButton'),
		};

		render(
			<ExpandableText
				dictionary={dictionary}
				testId='test-expandable-text'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellat adipisci et, eligendi ducimus accusamus consectetur, labore iusto esse, ratione pariatur laboriosam. Repudiandae, provident aspernatur. Adipisci nisi veniam incidunt tempore
			</ExpandableText>,
			{ wrapper: I18nextWrapper }
		);

		await screen.findByTestId<HTMLDivElement>('test-expandable-text');
		expect(screen.getByTestId<HTMLDivElement>('test-expandable-text')).toMatchSnapshot();
	});
});