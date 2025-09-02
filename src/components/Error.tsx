'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';

export default function Error() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    if (canceled) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');

      // トースト通知
      toast.error('注文はキャンセルされました。', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });

      // URLから `?canceled=...` を削除
      const url = new URL(window.location.href);
      url.searchParams.delete('canceled');
      window.history.replaceState({}, '', url.toString());
    }
  }, [canceled]);

  return <div></div>;
}
