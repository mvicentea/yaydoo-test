import { useUser } from '../lib/hooks'
import Head from 'next/head'
import Link from 'next/link'
import Col from 'react-bootstrap/Col'
import styles from '../styles/Home.module.css'

export default function Home() {
  const user = useUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>Yaydoo Test</title>
        <meta name="Home page" content="Home pege" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Col className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Yaydoo Test!
        </h1>

        {user && (
        <>
          <p>Currently logged in as: <span> <b>{`${user.name} ${user.lastName}`}</b> </span></p>
        </>
      )}
       {!user && 
        <p className={styles.description}>
          To start  <Link href="/login">
                      <a className="text-info">Sing In</a>
                    </Link> or 
                    <Link href="/signup">
                        <a className="text-info"> Sing Up</a>
                    </Link>
        </p>}
        </Col>
    </div>
  )
}