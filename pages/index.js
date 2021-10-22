import Image from 'next/image';
import Head from 'next/head';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { useAuth } from '@/lib/auth';
import styles from '@/styles/Home.module.css';
import GitHubIcon from '@/components/icons/GitHubIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';

const GitHubButton = styled(Button)(() => ({
  color: '#fff',
  backgroundColor: '#171923',
  boxShadow: 'none',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2d3748',
    boxShadow: 'none'
  }
}));

const GoogleButton = styled(Button)(() => ({
  color: '#2d3748',
  backgroundColor: '#fff',
  borderColor: '#e2e8f0',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f2f5fa',
    borderColor: '#e2e8f0'
  }
}));

const Home = () => {
  const { user, signinWithGitHub, signinWithGoogle, signout } = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Job Trackr</title>
        <meta
          name="description"
          content="Job Trackr is the easiest way to keep your job search organized in one place – the new job tracking board."
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('job-trackr-auth')) {
                window.location.href = "/job-tracking"
              }
            `
          }}
        />
      </Head>
      <main className={styles.main}>
        <Image
          src="/logo black text.svg"
          alt="Job trackr logo"
          width={110}
          height={110}
          priority
        />
        <p className={styles.description}>
          <b>Job Trackr</b> is the easiest way to keep your job search organized
          in one place – the new job tracking board. It&apos;s still a
          work-in-progress, but you can try it out by logging in.
        </p>

        {user ? (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Button variant="outlined" color="primary" href="/job-tracking">
              Dashboard
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => signout()}
            >
              Sign Out
            </Button>
          </Stack>
        ) : (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <GitHubButton
              onClick={() => signinWithGitHub('/job-tracking')}
              size="large"
              variant="contained"
              startIcon={
                <GitHubIcon
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  sx={{ height: '1.25rem' }}
                />
              }
            >
              Continue With GitHub
            </GitHubButton>
            <GoogleButton
              onClick={() => signinWithGoogle('/job-tracking')}
              size="large"
              variant="outlined"
              startIcon={
                <GoogleIcon
                  viewBox="0 0 533.5 544.3"
                  sx={{ height: '1.25rem' }}
                />
              }
            >
              Continue With Google
            </GoogleButton>
          </Stack>
        )}
      </main>
    </div>
  );
};

export default Home;
