import { render, screen } from "@testing-library/react";
import Avatar, { Props } from "./Avatar";
import userEvent from "@testing-library/user-event";
import AvatarPicture from '../../assets/avatar-example.jpg';

const appearances: NonNullable<Props['appearance']>[] = ['circle', 'square'];
const statuses: NonNullable<Props['status']>[] = ['approved', 'declined', 'locked'];
const sizes: NonNullable<Props['size']>[] = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
const presences: NonNullable<Props['presence']>[] = ['offline', 'online'];

describe('Avatar tests', () => {
	it('is rendered correctly', () => {
		render(
			<Avatar
				label='avatar label'
				size='xlarge'
				testId='test-avatar'
			/>
		);

		expect(screen.getByTestId<HTMLSpanElement>('test-avatar')).toBeInTheDocument();
	});

	it('when clicking on the avatar, the mock function should be called', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<Avatar
				label='avatar label'
				size='xlarge'
				onClick={mockFn}
				testId='test-avatar'
			/>
		);

		await user.click(screen.getByTestId<HTMLSpanElement>('test-avatar'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		render(
			<Avatar
				label='avatar label'
				size='xlarge'
				testId='test-avatar'
			/>
		);

		expect(screen.getByTestId<HTMLSpanElement>('test-avatar')).toMatchSnapshot();
	});

	it('is a snapshot with a picture instead of initials', () => {
		render(
			<Avatar
				label='avatar label'
				size='xlarge'
				testId='test-avatar'
				src={AvatarPicture.src}
			/>
		);

		expect(screen.getByTestId<HTMLSpanElement>('test-avatar')).toMatchSnapshot();
	});

	it.each(appearances)('is a snapshot with appearance equal to "%s"', (appearance) => {
		render(
			<Avatar
				label='avatar label'
				size='xlarge'
				testId='test-avatar'
				appearance={appearance}
			/>
		);

		expect(screen.getByTestId<HTMLSpanElement>('test-avatar')).toMatchSnapshot();
	});

	it.each(statuses)('is a snapshot with status equal to "%s"', (status) => {
		render(
			<Avatar
				label='avatar label'
				size='xlarge'
				testId='test-avatar'
				status={status}
			/>
		);

		expect(screen.getByTestId<HTMLSpanElement>('test-avatar')).toMatchSnapshot();
	});

	it.each(presences)('is a snapshot with status equal to "%s"', (presence) => {
		render(
			<Avatar
				label='avatar label'
				size='xlarge'
				testId='test-avatar'
				presence={presence}
			/>
		);

		expect(screen.getByTestId<HTMLSpanElement>('test-avatar')).toMatchSnapshot();
	});

	it.each(sizes)('is a snapshot with status equal to "%s"', (size) => {
		render(
			<Avatar
				label='avatar label'
				testId='test-avatar'
				size={size}
			/>
		);

		expect(screen.getByTestId<HTMLSpanElement>('test-avatar')).toMatchSnapshot();
	});
});