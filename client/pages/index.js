import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomeScreen from '../components/Home'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Terribly Tiny Tales</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <HomeScreen />
    </div>
  )
}
