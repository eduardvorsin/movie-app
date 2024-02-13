import { render, screen } from "@testing-library/react";
import Link, { Props } from "./Link";
import userEvent from "@testing-library/user-event";

const appearances: NonNullable<Props['appearance']>[] = ['primary', 'secondary'];

describe('Link tests', () => {
	it('is rendered correctly', () => {
		render(<Link href='/'>test link</Link>);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toBeInTheDocument();
	});
	it('when you click on the link, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(<Link href='/' onClick={mockFn}>test link</Link>);

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when the link receives the focus, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(<Link href='/' onFocus={mockFn}>test link</Link>);

		await user.tab();

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('when the focus is lost, the mock function is triggered', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(<Link href='/' onFocus={mockFn}>test link</Link>);

		await user.tab();
		await user.click(document.body);

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('if isDisabled is true then the link becomes inactive', async () => {
		const user = userEvent.setup();
		const mockFn = jest.fn();
		render(
			<Link
				href='/'
				onFocus={mockFn}
				isDisabled
			>
				test link
			</Link>
		);

		await user.click(screen.getByRole<HTMLAnchorElement>('link'));

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('is a basic snapshot', () => {
		render(<Link href='/'>test link</Link>);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});

	it('is a snapshot with isDisabled set to true', () => {
		render(<Link href='/' isDisabled>test link</Link>);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});

	it('is a snapshot with isExternal equal to true', () => {
		render(<Link href='/' isExternal>test link</Link>);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});

	it.each(appearances)('is a snapshot with the "%s" appearance type', (appearance) => {
		render(<Link href='/' appearance={appearance} >test link</Link>);

		expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
	});
});