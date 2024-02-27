import { render, screen } from '@testing-library/react';
import Comment from './Comment';
import i18next from '@/i18n/client';
import I18nextWrapper from '@/test-utils/I18nextWrapper';
import Avatar from '../Avatar/Avatar';
import CommentAction from './CommentAction/CommentAction';

describe('Comment tests', () => {
	it('is rendered correctly', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toBeInTheDocument();
	});

	it('if isSaving is true, then a message with the value of the savingText pass should be sent', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				isSaving
				savingText='saving'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByText<HTMLSpanElement>('saving')).toBeInTheDocument();
	});

	it('if the value for the time parameter is not empty, it should show the time', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				time='10:00'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByRole<HTMLButtonElement>('button', { name: /10\:00/ })).toBeInTheDocument();
	});

	it('if isEdited is true, then the word "Edited" should be rendered', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				isEdited
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByText<HTMLSpanElement>(/edited/i)).toBeInTheDocument();
	});

	it('if the value for restrictedTo is not empty, then it should render this value', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				restrictedTo='admins'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByText<HTMLSpanElement>(/admins/i)).toBeInTheDocument();
	});

	it('if isError is true then an error message should be displayed', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				isError
				content='test content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByRole<HTMLParagraphElement>('alert')).toBeInTheDocument();
	});

	it('if isError is true and errorActions is not an empty array then it should render the buttons from errorActions', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				isError
				content='test content'
				errorActions={[
					<CommentAction key={1} onClick={() => { }}>Resend</CommentAction>,
					<CommentAction key={2} onClick={() => { }}>Remove</CommentAction>,
				]}
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByRole<HTMLButtonElement>('button', { name: /resend/i })).toBeInTheDocument();
		expect(screen.getByRole<HTMLButtonElement>('button', { name: /remove/i })).toBeInTheDocument();
	});

	it('if highlited is true, it should show the element to highlight', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				highlighted
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>(/highlighting/i)).toBeInTheDocument();
	});

	it('if the rating value is not empty, then it should render it', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				rating={80}
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByText<HTMLSpanElement>(/80/)).toBeInTheDocument();
	});

	it('is a basic snapshot', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with the afterContent property', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				afterContent='test after content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('snapshot with isEdited equal to true', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				isEdited
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with restrictedTo', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				restrictedTo='admins'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with the isSaving set to true', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				isSaving
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with the time property', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				time='10:00'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with highlited set to true', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				highlighted
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('a snapshot with an attached comment', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			>
				<Comment
					id='test-comment-2'
					author='test-author-2'
					type='test'
					titleElement='h4'
					testId='test-comment-2'
					dictionary={dictionary}
					content='test content 2'
					avatar={
						<Avatar
							label='avatar label 2'
							size='xlarge'
							testId='test-avatar-2'
						/>
					}
				/>
			</Comment>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with isError equal to true and errorActions', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				isError
				content='test content'
				errorActions={[
					<CommentAction key={1} onClick={() => { }}>Resend</CommentAction>,
					<CommentAction key={2} onClick={() => { }}>Remove</CommentAction>,
				]}
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with actions', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				actions={[
					<CommentAction key={1} onClick={() => { }}>Like</CommentAction>,
				]}
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with the shouldRenderNestedCommentsInline property', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				shouldRenderNestedCommentsInline
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			>
				<Comment
					id='test-comment-2'
					author='test-author-2'
					type='test'
					titleElement='h4'
					testId='test-comment-2'
					dictionary={dictionary}
					content='test content 2'
					avatar={
						<Avatar
							label='avatar label 2'
							size='xlarge'
							testId='test-avatar-2'
						/>
					}
				/>
			</Comment>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with rating', () => {
		const dictionary = {
			ratingLabel: 'rating',
			edited: 'Edited',
			savingText: 'Sending...',
			expandableText: {
				expandButton: 'Expand',
				collapseButton: 'Collapse',
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				rating={80}
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});
});

describe('Comment integration tests', () => {
	it('localization into English works correctly', async () => {
		await i18next.changeLanguage('en');
		const translation = new RegExp(i18next.t('comment.ratingLabel'));
		const dictionary = {
			ratingLabel: i18next.t('comment.ratingLabel'),
			edited: i18next.t('comment.edited'),
			savingText: i18next.t('comment.savingText'),
			expandableText: {
				expandButton: i18next.t('comment.expandButton'),
				collapseButton: i18next.t('comment.collapseButton'),
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				rating={30}
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByLabelText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('localization into Russian works correctly', async () => {
		await i18next.changeLanguage('ru');
		const translation = new RegExp(i18next.t('comment.ratingLabel'));
		const dictionary = {
			ratingLabel: i18next.t('comment.ratingLabel'),
			edited: i18next.t('comment.edited'),
			savingText: i18next.t('comment.savingText'),
			expandableText: {
				expandButton: i18next.t('comment.expandButton'),
				collapseButton: i18next.t('comment.collapseButton'),
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				rating={30}
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByLabelText<HTMLSpanElement>(translation)).toBeInTheDocument();
	});

	it('is a snapshot with English localization', async () => {
		await i18next.changeLanguage('en');
		const dictionary = {
			ratingLabel: i18next.t('comment.ratingLabel'),
			edited: i18next.t('comment.edited'),
			savingText: i18next.t('comment.savingText'),
			expandableText: {
				expandButton: i18next.t('comment.expandButton'),
				collapseButton: i18next.t('comment.collapseButton'),
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});

	it('is a snapshot with Russian localization', async () => {
		await i18next.changeLanguage('ru');
		const dictionary = {
			ratingLabel: i18next.t('comment.ratingLabel'),
			edited: i18next.t('comment.edited'),
			savingText: i18next.t('comment.savingText'),
			expandableText: {
				expandButton: i18next.t('comment.expandButton'),
				collapseButton: i18next.t('comment.collapseButton'),
			}
		};

		render(
			<Comment
				id='test-comment'
				author='test-author'
				type='test'
				titleElement='h4'
				testId='test-comment'
				dictionary={dictionary}
				content='test content'
				avatar={
					<Avatar
						label='avatar label'
						size='xlarge'
						testId='test-avatar'
					/>
				}
			/>,
			{ wrapper: I18nextWrapper }
		);

		expect(await screen.findByTestId<HTMLDivElement>('test-comment')).toMatchSnapshot();
	});
});