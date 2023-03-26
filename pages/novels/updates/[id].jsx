

import Head from "next/head"
import Link from "next/link"

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import NavBar from '@/components/navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Supplier({ supplier }) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  /*
  useEffect(() => {
    resizeTo(supplier)
  }, [])
  */
  

  const updateSupplier = async (data) => {
    const response = await fetch(`https://stock-final-6213934.vercel.app/api/suppliers/articles/${supplier._id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        //redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const result = await response.json(); // parses JSON response into native JavaScript objects
    if (result.error){
        alert("Error: " + result.error)
    } else {
        alert("Suppliers updated")
        window.location.href = "https://stock-final-6213934.vercel.app/suppliers"
    }
    console.log(result)
    setData(JSON.stringify(data))
}


  
  console.log('supplier 2', supplier)
  if (!supplier) return (
    <div>
      <p>Record not found</p>
      <Link href="https://stock-final-6213934.vercel.app/suppliers">Back</Link>
      </div>
  ); 

  return (
    <>
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
            <br /><h2 style={{color: "#B46060", textAlign: "center"}}><b>Update Supplier Record</b></h2><br />
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
      
            <Form onSubmit={handleSubmit(updateSupplier)}>
                 <br />
              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="name" style={{color: "#D27685"}} ><i><h5>Supplier</h5></i></Form.Label><br />
              <Form.Control id="name" {...register("name", { required: true })} placeholder="Supplier Name" defaultValue={supplier.name}  /> 
              <Form.Text className="text-muted">
              </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label htmlFor="address" style={{color: "#D27685"}} ><i><h5>Address</h5></i></Form.Label>
              <Form.Control as="textarea" rows={3} textarea id="address" {...register("address")} placeholder="Address" defaultValue={supplier.address}  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label htmlFor="phone" style={{color: "#D27685"}} ><i><h5>Phone</h5></i></Form.Label><br />
              <Form.Control id="phone" {...register("phone", { required: true })} placeholder="Phone" defaultValue={supplier.phone}/> 
              <Form.Text className="text-muted">
              </Form.Text>
              </Form.Group>

              <div className="d-grid gap-2"> 
                  <Button variant="warning" size="lg" type="submit"> S A V E</Button>
                  <p>{data}</p><br />
              </div>
            </Form>

            <Button variant="secondary" href="https://stock-final-6213934.vercel.app/suppliers" >Back </Button>
     
            </div>
      </div>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`https://stock-final-6213934.vercel.app/api/suppliers/articles/${params.id}`)
  const supplier = await res.json()
  console.debug('supplier 1', supplier)
  return { props: { supplier } }
}
