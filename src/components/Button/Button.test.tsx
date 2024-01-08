import { render, screen } from '@testing-library/react';
import Button from './Button';
import React from 'react';
import userEvent from '@testing-library/user-event';

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

   it('is a snapshot with the "primary" appearance type', () => {
      render(<Button appearance='primary'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "secondary" appearance type', () => {
      render(<Button appearance='secondary'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "warning" appearance type', () => {
      render(<Button appearance='warning'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "danger" appearance type', () => {
      render(<Button appearance='danger'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "success" appearance type', () => {
      render(<Button appearance='success'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "discovery" appearance type', () => {
      render(<Button appearance='discovery'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "micro" size type', () => {
      render(<Button size='micro'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "slim" size type', () => {
      render(<Button size='slim'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "medium" size type', () => {
      render(<Button size='medium'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });

   it('is a snapshot with the "large" size type', () => {
      render(<Button size='large'>Button</Button>);

      expect(screen.getByRole<HTMLButtonElement>('button')).toMatchSnapshot();
   });
});
