import { render, screen } from "@testing-library/react";
import InlineMessage from "./InlineMessage";

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

	it('is a snapshot with the icon on the right', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				iconPosition='right'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});

	it('is a snapshot with the icon on the left', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				iconPosition='left'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});

	it('is a snapshot with a "connectivity" type appearance', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				appearance='connectivity'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});

	it('is a snapshot with a "confirmation" type appearance', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				appearance='confirmation'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});

	it('is a snapshot with a "info" type appearance', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				appearance='info'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});

	it('is a snapshot with a "warning" type appearance', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				appearance='warning'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});

	it('is a snapshot with a "error" type appearance', () => {
		render(
			<InlineMessage
				fieldId='test-inline-message'
				appearance='error'
				message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt asperiores cupiditate, voluptas non ab soluta. Non odit facere quae tempora.'
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toMatchSnapshot();
	});
});