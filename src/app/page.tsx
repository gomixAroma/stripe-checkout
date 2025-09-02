import Error from '@/components/Error';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Suspense } from 'react';
export default function Home() {
  return (
    <Suspense fallback="loading...">
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            width: 'min(500px, 90%)',
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
          <Box
            sx={{
              px: 2,
              py: 1.5,

              width: '100%',

              backgroundColor: '#fff',

              boxShadow: '6px 6px 10px 0px rgba(0, 0, 0, 0.4)',
              borderRadius: '15px',
            }}
          >
            <form
              action='/api/checkout_sessions'
              method='POST'
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='body1'
                mb={1}
                fontFamily='var(--font-bd)'
              >
                **** ライセンス ¥2,000
              </Typography>
              <Button
                type='submit'
                fullWidth
                variant='contained'
              >
                購入
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
      <Error />
    </Susp>
  );
}
