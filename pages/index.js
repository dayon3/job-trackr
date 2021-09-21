import Image from 'next/image';
import Head from 'next/head';
import Button from '@mui/material/Button';

import { useAuth } from '@/lib/auth';
import styles from '@/styles/Home.module.css';
import GitHubIcon from '@/components/icons/GitHubIcon';

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
          src="/Logo with no text.svg"
          alt="Job trackr logo"
          width={60}
          height={60}
        />
        <p className={styles.description}>
          Job Tracker is the easiest way to organize and keep track of your job
          application process. It&apos;s still a work-in-progress, but you can
          try it out by logging in.
        </p>

        <p>
          Current user: <code>{auth.user ? auth.user.email : 'None'}</code>
        </p>
        {auth.user ? (
          <Button
            variant="contained"
            color="status"
            onClick={(e) => auth.signout()}
          >
            Sign Out
          </Button>
        ) : (
          <Button
            onClick={(e) => auth.signinWithGitHub()}
            variant="contained"
            color="primary"
            sx={{
              textTransform: 'none',
              marginRight: '16px',
              backgroundColor: 'black',
              paddingTop: '10px',
              paddingBottom: '10px'
            }}
            startIcon={
              <GitHubIcon
                viewBox="0 0 22 22"
                stroke="currentColor"
                strokeWidth="2"
              />
            }
          >
            Sign In With GitHub
          </Button>
        )}
      </main>
    </div>
  );
};

export default Home;
