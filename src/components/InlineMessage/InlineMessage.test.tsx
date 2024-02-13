import { render, screen } from "@testing-library/react";
import InlineMessage, { Props } from "./InlineMessage";
const appearances: NonNullable<Props['appearance']>[] = ['connectivity', 'confirmation', 'info', 'warning', 'error'];
const iconPositions: NonNullable<Props['iconPosition']>[] = ['left', 'right'];

describe('InlineMessage tests', () => {
	it('is rendered correctly', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});

	it.each(iconPositions)('is a snapshot with the icon on the %s', (iconPosition) => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				iconPosition={iconPosition}
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});

	it.each(appearances)('is a snapshot with a "%s" type appearance', (appearance) => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				appearance={appearance}
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});
});