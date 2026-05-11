import { useEffect, useState } from 'react';
import type { DetailPost, RelatedItem, WorkDetailResponse } from '@/lib/work-detail-types';

type Status = 'loading' | 'ok' | 'not-found' | 'error';

export interface UseWorkResult {
  status: Status;
  post: DetailPost | null;
  related: RelatedItem[];
  error: string | null;
}

export function useWork(slug: string | undefined): UseWorkResult {
  const [post, setPost] = useState<DetailPost | null>(null);
  const [related, setRelated] = useState<RelatedItem[]>([]);
  const [status, setStatus] = useState<Status>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setStatus('not-found');
      setPost(null);
      setRelated([]);
      setError(null);
      return;
    }

    let cancelled = false;
    setStatus('loading');
    setError(null);
    setPost(null);
    setRelated([]);

    (async () => {
      try {
        const res = await fetch(`/api/works/${encodeURIComponent(slug)}`);
        if (res.status === 404) {
          if (cancelled) return;
          setStatus('not-found');
          return;
        }
        if (!res.ok) throw new Error(`/api/works/${slug} returned ${res.status}`);
        const data = (await res.json()) as WorkDetailResponse;
        if (cancelled) return;
        setPost(data.post);
        setRelated(data.related);
        setStatus('ok');
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : String(err));
        setStatus('error');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { status, post, related, error };
}
