import { useEffect } from 'react';

//修改title

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
