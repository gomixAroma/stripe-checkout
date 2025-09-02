import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { stripe } from '../../lib/stripe';
export default async function Success({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
  const { session_id } = await searchParams;

  if (!session_id) throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent'],
  });

  const customerEmail = session.customer_details?.email || '不明';

  if (session.status === 'open') {
    return redirect('/');
  }

  if (session.status === 'complete') {
    return (
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          width: '100vw',
          height: '100dvh',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            py: 1.5,
            px: 2,
            borderRadius: 'var(--border-radius)',
            // width: 'min(500px, 90%)',
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Image
              alt='stripe'
              src={'/images/logo/stripe.png'}
              width={150}
              height={62.5}
              priority
            />
          </Box>
          <Typography
            variant='body1'
            fontFamily='var(--font-bd)'
          >
            ご利用ありがとうございます! 確認メールが{customerEmail}に送信されます
          </Typography>
          <Typography
            variant='body1'
            fontFamily='var(--font-bd)'
          >
            ご質問は<a href='mailto:orders@example.com'>orders@example.com</a>までご連絡ください。
          </Typography>
          <Button
            fullWidth
            href='/'
            variant='contained'
            sx={{
              mt: 2,
            }}
          >
            戻る
          </Button>
        </Box>
      </Box>
    );
  }
}
