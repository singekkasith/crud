
import Head from "next/head"
import Link from "next/link"

import NavBar from '@/components/navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';


// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  console.log('blog 2', supplier)
  if (!supplier) return (
    <div>
      <p>Record not found</p>
      <Link href="https://stock-final-6213934.vercel.app/suppliers">Back</Link>
      </div>
  );

  return (
    <>
      <Head>
        <title>{supplier.name}</title>
      </Head>

      <Head>
        <title>Update {supplier.name}</title>
      </Head>

      <div style={{
            zIndex: -10,
            position: 'fixed',
            height: '100vh',
            width: '100vw'
        }}>
            <Image
                src="/addBg.webp"
                alt="Nice Background"
                layout="fill"
                objectFit='cover'
            ></Image>
        </div>

        <NavBar />

        <div style={{
            margin: 'auto',
            height: '12vh',
            width: '100vw',
            backgroundColor: "#191825"
        }} class="border-bottom  border-white">
            <br /><h2 style={{color: "#B46060", textAlign: "center"}}><b>{supplier.name} Record</b></h2><br />
        </div>
        
        <div style={{
            margin: 'auto',
            height: '100vh',
            width: '100vw',
            backgroundColor: "rgba(0,0,0,0.7)",
        
        }}>
            <div style={{
            margin: 'auto',
            height: '100vh',
            width: '90vw',
            
            
        
        }}>
            <br />
            <h3 style={{color: "#66347F"}} >Address</h3>
            <h6 style={{color: "#9E4784"}} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{supplier.address}</h6>

            <br />
            <h3 style={{color: "#66347F"}} >Phone</h3>
            <h6 style={{color: "#9E4784"}} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{supplier.phone}</h6>

          <div>
            <br />
          <Button variant="secondary" href="https://stock-final-6213934.vercel.app/suppliers" >Back </Button>
          </div>
            
        </div>        
     
      </div>
      
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`https://stock-final-6213934.vercel.app/api/suppliers/articles${params.id}`)
  const supplier = await res.json()
  console.debug('blog 1', supplier)
  return { props: { supplier } }
}
