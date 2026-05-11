import React from 'react';
import type { TwoColumnsBlock } from '@/lib/work-detail-types';
import { SERIF, SANS } from '@/lib/brand';

export function TwoColumns({ block }: { block: TwoColumnsBlock }) {
  if (!block.title && !block.description) return null;

  return (
    <section style={{ background: '#ffffff', padding: '90px 0' }}>
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: '0 15px' }}>
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="md:basis-2/3 md:flex-grow-0">
            {block.title && (
              <h2 style={{
                fontFamily: SERIF,
                fontStyle: 'italic',
                fontSize: 36,
                lineHeight: 1.2,
                color: '#2d3232',
                margin: 0,
              }}>
                {block.title}
              </h2>
            )}
          </div>
          <div className="md:basis-1/3 md:flex-grow-0">
            {block.description && (
              <p style={{
                fontFamily: SANS,
                fontSize: 16,
                lineHeight: 1.7,
                color: 'rgba(45,50,50,0.85)',
                margin: 0,
              }}>
                {block.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
