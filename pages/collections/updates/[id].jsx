

import Head from "next/head"
import Link from "next/link"

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import NavBar from '@/components/navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'next/image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Moment from 'moment';
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
    const response = await fetch(`/api/novels/chapters/${supplier._id}`, {
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
        alert("Novel updated")
        window.location.href = "/collections"
    }
    console.log(result)
    setData(JSON.stringify(data))
}


  
  console.log('supplier 2', supplier)
  if (!supplier) return (
    <div>
      <p>Novel not found</p>
      <Link href="collections">Back</Link>
      </div>
  ); 

  return (
    <>
      <Head>
        <title>Update Novel: {supplier.title}</title>
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
            <br /><h2 style={{color: "#B46060", textAlign: "center"}}><b>Update Novel: {supplier.title}</b></h2><br />
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
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label htmlFor="author" style={{color: "#D27685"}} ><i><h5>Author</h5></i></Form.Label><br />
                            <Form.Control id="author" {...register("author", { required: true })} placeholder="Author's Name" defaultValue={supplier.author}/> 
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label htmlFor="title" style={{color: "#D27685"}} ><i><h5>Title</h5></i></Form.Label><br />
                            <Form.Control id="title" {...register("title", { required: true })} placeholder="Novel Title" defaultValue={supplier.title}/> 
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Row>

                    <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label htmlFor="imgUrl" style={{color: "#D27685"}} ><i><h5>Image URLs</h5></i></Form.Label><br />
                            <Form.Control id="imgUrl" {...register("imgUrl", { required: true })} placeholder="Place Image URLs" defaultValue={supplier.imgUrl}/> 
                            <Form.Text className="text-muted">
                            </Form.Text>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label htmlFor="dateUpdate" style={{color: "#D27685"}} ><i><h5>Latest Update</h5></i></Form.Label><br />
                            <Form.Control id="dateUpdate" {...register("dateUpdate")} placeholder="Latest Update"  readOnly defaultValue={Moment().format('MMMM Do YYYY, h:mm:ss a')}/> 
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                            <Form.Label htmlFor="status" style={{color: "#D27685"}} ><i><h5>Status</h5></i></Form.Label><br />
                            <Form.Select  id="status" {...register("status", { required: true })}>
                                <option value="On-Going">On-Going</option>
                                <option value="Complete">Complete</option>
                                <option value="On-Paused">On-Paused</option>
                                <option value="Discontinued">Discontinued</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label htmlFor="synopsis" style={{color: "#D27685"}} ><i><h5>Synopsis</h5></i></Form.Label>
                        <Form.Control as="textarea" rows={3} textarea id="synopsis" {...register("synopsis")} placeholder="Synopsis" defaultValue={supplier.synopsis} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label htmlFor="note" style={{color: "#D27685"}} ><i><h5>Author Note</h5></i></Form.Label>
                        <Form.Control as="textarea" rows={3} textarea id="note" {...register("note")} placeholder="Author's Note" defaultValue={supplier.note} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label htmlFor="content" style={{color: "#D27685"}} ><i><h5>Content</h5></i></Form.Label>
                        <Form.Control as="textarea" rows={10} textarea id="content" {...register("content")} placeholder="Write Your Story Here...." defaultValue={supplier.content} />
                    </Form.Group>
                    
                    <div className="d-grid gap-2"> 
                    <Button variant="warning" size="lg" type="submit"> S A V E</Button>
                    <p>{data}</p><br />
                     </div>
            </Form>

            <Button variant="secondary" href="/collections" >Back </Button>
     
            </div>
      </div>
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`https://crud-novel.vercel.app/api/novels/chapters/${params.id}`)
  const supplier = await res.json()
  console.debug('supplier 1', supplier)
  return { props: { supplier } }
}
