'use client';

/**
 * Typed re-export of framer-motion `motion` and `AnimatePresence` that works
 * with React 19 RC.
 *
 * framer-motion 11 derives `className` and other HTML props from `ReactHTML`
 * (via `DetailedHTMLFactory`). React 19 RC changed the shape of `ReactHTML`
 * so that `UnwrapFactoryAttributes<ReactHTML['div']>` resolves to `unknown`
 * instead of `React.HTMLAttributes<HTMLDivElement>`. This means `className`
 * disappears from the inferred type of `motion.div`.
 *
 * Fix: cast the element types once here so consumers can import the patched
 * versions without individual casts on every JSX element.
 */
import {
  motion as _motion,
  AnimatePresence,
  type MotionProps,
} from 'framer-motion';
import type { ComponentPropsWithRef, FC } from 'react';

type DivMotionProps = ComponentPropsWithRef<'div'> & MotionProps;

const motion = {
  ..._motion,
  div: _motion.div as unknown as FC<DivMotionProps>,
};

export { motion, AnimatePresence };
