import { render, screen } from "@testing-library/react";
import Banner, { Props } from "./Banner";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button/Button";
const appearances: NonNullable<Props['appearance']>[] = ['success', 'info', 'warning', 'danger', 'discovery'];

describe('Banner tests', () => {
	it('is rendered correctly', () => {
		render(
			<Banner
				closeButton={false}
				testId='test-banner'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-banner')).toBeInTheDocument();
	});

	it('if the title prop is empty then the title will not be rendered', () => {
		render(
			<Banner
				closeButton={false}
				testId='test-banner'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.queryByRole<HTMLHeadingElement>('heading')).not.toBeInTheDocument();
	});


	it('if hideIcon is true, the icon to the left of the text is hidden', () => {
		render(
			<Banner
				closeButton={false}
				hideIcon
				testId='test-banner'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.queryByRole<HTMLSpanElement>('presentation')).not.toBeInTheDocument();
	});

	it('if the close Button is set to true, the close button of the banner is displayed.', () => {
		render(
			<Banner
				closeButton
				testId='test-banner'
				dictionary={{ closeButton: 'To close' }}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.getByRole<HTMLButtonElement>('button', { name: /close/i })).toBeInTheDocument();
	});

	it('when you click on the banner close button, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<Banner
				closeButton
				onClose={mockFn}
				testId='test-banner'
				dictionary={{ closeButton: 'To close' }}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /close/i }))

		expect(mockFn).toHaveBeenCalledTimes(1);
	});


	it('is a basic snapshot', () => {
		render(
			<Banner
				closeButton={false}
				testId='test-banner'
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-banner')).toMatchSnapshot();
	});

	it('is a snapshot with closeButton equal to true', () => {
		render(
			<Banner
				testId='test-banner'
				closeButton
				dictionary={{ closeButton: 'To close' }}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-banner')).toMatchSnapshot();
	});

	it.each(appearances)('is a snapshot with a "%s" type appearance', (appearance) => {
		render(
			<Banner
				testId='test-banner'
				appearance={appearance}
				closeButton={false}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-banner')).toMatchSnapshot();
	});

	it('is a snapshot with hideIcon equal to true', () => {
		render(
			<Banner
				testId='test-banner'
				hideIcon
				closeButton={false}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-banner')).toMatchSnapshot();
	});

	it('is a snapshot with action buttons', () => {
		render(
			<Banner
				testId='test-banner'
				closeButton={false}
				actions={[
					<Button key={0}>action</Button>,
					<Button key={1}>action</Button>,
					<Button key={2}> action</Button>,
				]}
			>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus tempora provident accusamus quaerat iure atque labore odit voluptatem quisquam, maiores voluptas veritatis voluptate sed magni quod enim nobis tempore corrupti.
			</Banner>
		);

		expect(screen.getByTestId<HTMLDivElement>('test-banner')).toMatchSnapshot();
	});
});