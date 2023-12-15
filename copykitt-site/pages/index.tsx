import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import CopyKitt from '../components/copykitt'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BrandGenerator.ai | AI Generated Marketing</title>
        <meta name="description" content="Generated branding snippets for your product." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
        <CopyKitt/>
      
    </>
  )
}
