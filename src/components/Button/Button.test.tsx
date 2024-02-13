import { render, screen } from '@testing-library/react';
import Button, { Props } from './Button';
import React from 'react';
import userEvent from '@testing-library/user-event';

const appearances: NonNullable<Props['appearance']>[] = ['primary', 'secondary', 'warning', 'danger', 'success', 'discovery', 'ghost'];
const sizes: NonNullable<Props['size']>[] = ['micro', 'slim', 'medium', 'large'];

describe('Button tests', () => {
   it('renders correctly', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toBeInTheDocument();
   });

   it('when you click on the button, the mock function should work', async () => {
      const user = userEvent.setup();
      const mockFn = jest.fn();
      render(<Button onClick={mockFn}>Button</Button>);

      await user.click(screen.getByRole<HTMLButtonElement>('button'));

      expect(mockFn).toHaveBeenCalledTimes(1);
   });

   it('when the focus hits the button, the mock function should work', async () => {
      const user = userEvent.setup();
      const mockFn = jest.fn();
      render(<Button onFocus={mockFn}>Button</Button>);

      await user.tab();

      expect(mockFn).toHaveBeenCalledTimes(1);
   });

   it('if you lose focus from the button, the mock function should work', async () => {
      const user = userEvent.setup();
      const mockFn = jest.fn();
      render(<Button onBlur={mockFn}>Button</Button>);

      await user.tab();
      await user.click(document.body);

      expect(mockFn).toHaveBeenCalledTimes(1);
   });

   it('when isLoading is set to true, the spinner should appear', () => {
      render(<Button isLoading>Button</Button>);

      expect(screen.getByTestId<HTMLSpanElement>('spinner')).toBeInTheDocument();
   });

   it('with isDisabled set to true, the button should be inactive when clicked', async () => {
      const user = userEvent.setup();
      const mockFn = jest.fn();
      render(<Button isDisabled onClick={mockFn}>Button</Button>);

      await user.click(screen.getByRole<HTMLButtonElement>('button'));

      expect(mockFn).toHaveBeenCalledTimes(0);
   });

   it('is a basic snapshot', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it.each(appearances)('is a snapshot with the "%s" appearance type', (appearance) => {
      render(<Button appearance={appearance}>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it.each(sizes)('is a snapshot with the "%s" size type', (size) => {
      render(<Button size={size}>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });
});
