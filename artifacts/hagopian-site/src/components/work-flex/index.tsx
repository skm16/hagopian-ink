import React from 'react';
import type { FlexBlock } from '@/lib/work-detail-types';
import { TwoColumns } from './TwoColumns';
import { Columns } from './Columns';
import { FullImage } from './FullImage';
import { TextBlock } from './TextBlock';
import { MobilePages } from './MobilePages';
import { DesktopPages } from './DesktopPages';
import { Slider } from './Slider';
import { SliderTwoSlides } from './SliderTwoSlides';
import { Gallery } from './Gallery';

export function renderBlock(block: FlexBlock, key: number | string): React.ReactNode {
  switch (block.acf_fc_layout) {
    case 'two-columns-single-work':
      return <TwoColumns key={key} block={block} />;
    case 'columns-single-work':
      return <Columns key={key} block={block} />;
    case 'full-image-single-work':
      return <FullImage key={key} block={block} />;
    case 'text-bock-single-work':
      return <TextBlock key={key} block={block} />;
    case 'mobile-pages-single-work':
      return <MobilePages key={key} block={block} />;
    case 'desktop-pages':
      return <DesktopPages key={key} block={block} />;
    case 'slider':
      return <Slider key={key} block={block} />;
    case 'slider_two_slides':
      return <SliderTwoSlides key={key} block={block} />;
    case 'gallery':
      return <Gallery key={key} block={block} />;
  }
}
