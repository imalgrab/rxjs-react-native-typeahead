import { useEffect } from 'react';
import { Observable } from 'rxjs';

export function useSubscription<T>(
  source$: Observable<T>,
  nextHandler: (next: T) => void
) {
  useEffect(() => {
    if (source$) {
      const subscription = source$.subscribe(nextHandler);
      return () => subscription.unsubscribe();
    }
  }, [source$]);
}
