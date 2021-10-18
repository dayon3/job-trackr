import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import styles from '@/styles/DashboardShell.module.css';
import Nav from './Nav';
import AddIcon from './icons/AddIcon';

export default function DashboardShell(props) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Job Trackr – Dashboard.',
    description: `Easiest way to organize and keep track of your job
    application process.`,
    image: 'https://job-trackr.vercel.app/static/images/banner.png',
    type: 'website',
    ...customMeta
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://job-trackr.vercel.app${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://job-trackr.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Davis Gitonga" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jobtrackr" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <header className={styles.header}>
        <Nav />
      </header>
      <Box sx={{ backgroundColor: `${props.button ? '#fff' : '#f2f5fa'}` }}>
        <main id="skip" className={styles.main}>
          {props.cta ? (
            <>
              <section className={styles.cta}>
                <h2 className={styles.heading}>Job Tracking</h2>
                {props.button ? (
                  <NextLink href="/job-tracking" passHref>
                    <Button
                      variant="contained"
                      sx={{ textTransform: 'none' }}
                      startIcon={<AddIcon fill="#fff" />}
                    >
                      Add Job
                    </Button>
                  </NextLink>
                ) : (
                  /* TODO: add button modal with how to use instructions */
                  <button className={styles.btn}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 19a9 9 0 100-18 9 9 0 000 18zm1.3-13a1.2 1.2 0 11-2.5 0 1.2 1.2 0 012.5 0zm-.3 9V9H9v6h2z"
                      ></path>
                    </svg>
                    <span className={styles.span}>How to use?</span>
                  </button>
                )}
              </section>
              <section className={styles.wrapper}>
                <div className={styles.columns}>{children}</div>
              </section>
            </>
          ) : (
            <section className="">{children}</section>
          )}
        </main>
      </Box>
    </div>
  );
}
