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
  '&:hover': {
    backgroundColor: '#f2f5fa',
    borderColor: '#e2e8f0'
  }
}));

const Home = () => {
  const auth = useAuth();

  return (
    <div className={styles.container}>
      <Head>
        <title>Job Trackr</title>
        <meta
          name="description"
          content="Easiest way to organize and keep track of your job
          application process."
        />
      </Head>
      <main className={styles.main}>
        <Image
          src="/logo black text.svg"
          alt="Job trackr logo"
          width={110}
          height={110}
        />
        <p className={styles.description}>
          <b>Job Trackr</b> is the easiest way to organize and keep track of
          your job application process. It&apos;s still a work-in-progress, but
          you can try it out by logging in.
        </p>

        {auth.user ? (
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => auth.signout()}
          >
            Sign Out
          </Button>
        ) : (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <GitHubButton
              onClick={(e) => auth.signinWithGitHub()}
              size="large"
              variant="contained"
              sx={{
                textTransform: 'none'
              }}
              startIcon={
                <GitHubIcon
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              }
            >
              Continue With GitHub
            </GitHubButton>
            <GoogleButton
              onClick={(e) => auth.signinWithGitHub()}
              size="large"
              variant="outlined"
              sx={{
                textTransform: 'none'
              }}
              startIcon={<GoogleIcon viewBox="0 0 533.5 544.3" />}
            >
              Continue With Google
            </GoogleButton>
          </Stack>
        )}
      </main>
      {/* TODO:
      <img
        src="/images/footer-illustration.svg"
        alt=""
        className={styles.image}
      /> */}
    </div>
  );
};

export default Home;
