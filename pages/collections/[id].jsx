
import Head from "next/head"
import Link from "next/link"

import NavBar from '@/components/navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Container, Image, Row, Col, Table } from 'react-bootstrap';

function deleteBlog(id) {
  fetch(`/api/novels/chapters/${id}`,
    {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      // alert("Deleting " + id)
      window.location.reload(false);
    })

}

// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  console.log('blog 2', supplier)
  if (!supplier) return (
    <div>
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
        <div style={{
            margin: 'auto',
            height: '100vh',
            width: '100vw',
            backgroundColor: "rgba(0,0,0,0.7)"
        }}>

          <br />
            <span style={{color: "#FFFFFF", textAlign: "center"}}><h1>Record not found</h1>
            <br />
            <br />
            <Button variant="danger" size="sl" style={{ marginLeft: '58rem' }} href={`/collections`}> Back </Button>
            </span>
          </div>
        </div>
  );

  return (
    <>
      <Head>
        <title>{supplier.title} by {supplier.author}</title>
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
            height: '5vh',
            backgroundColor: "#423F3E"
        }} >
            <h3 style={{color: "#E4DCCF" ,textAlign: "center"}}><b>Novel: {supplier.title}</b></h3>
        </div>

      
        <div style={{
            margin: 'auto',
            height: '100vh',
            width: '100vw',
            backgroundColor: "rgba(0,0,0,0.7)"
        }}>

          <br />
            <div style={{
                margin: 'auto',
                width: '90vw',
                backgroundColor: "#191825",
                borderRadius: "15px"
            }} >
              <br />
                <Container>
                  <Row>
                    <Col>
                        <Row>
                            <Card bg ="dark" text = "white" style={{ width: '20rem'}} >
                              <Card.Img variant="top" src={supplier.imgUrl} 
                                  />
                              <Card.Body>
                                <Card.Subtitle>
                                  Status: {supplier.status}
                                </Card.Subtitle>
                              </Card.Body>
                            </Card>
                        </Row>
                    </Col> 
                    <Col sm={7} style={{color: "#FFFFFF"}}>
                      
                        
                        <Row >
                            <Col><b>Author :</b></Col>  
                            <Col><b>Published Date :</b></Col>
                            <Row>
                                <Col>&nbsp;&nbsp;&nbsp;&nbsp;{supplier.author}</Col>
                                <Col>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{supplier.datePublish}</Col>
                            </Row>
                            
                        </Row>
                        <Row>
                            <b>Last Update :</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {supplier.dateUpdate}
                        </Row>
                        <Row>
                            <b>Synopsis :</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {supplier.synopsis}
                        </Row>

                        <Row>
                            <b>Note :</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {supplier.note}
                        </Row>
                    </Col>
                  </Row>
              </Container>

                
              <br />
            </div>

            <br />
            <div style={{
                margin: 'auto',
                width: '90vw',
                heigth: '100rem',
                backgroundColor: "#F5EBEB",
                borderRadius: "15px"
            }} >
              
              <Button variant="warning" size="sl" style={{ marginLeft: '1rem' }} href={`/collections/updates/${supplier._id}`}><Image
                                alt=""
                                src="/edit.ico"
                                width="20"
                                height="20"
                                className="d-inline-block align-top"
                            /> Edit a Novel </Button>
              
              <Button variant="danger" size="sl" style={{ marginLeft: '1rem' }} href={`/collections`} onClick={() => deleteBlog(supplier._id)} > <Image 
                                alt=""
                                src="/bin.ico"
                                width="20"
                                height="20"
                                className="d-inline-block align-top"
                            /> Delete
              </Button>
              <Container>
              <br /><h5 style={{color: "#867070" ,textAlign: "center"}} ><b></b>Story: {supplier.title}</h5><br /><br />
              <span style={{whiteSpace: "pre-line"}}> <h4 style={{color: "#000000"}} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{supplier.content}</h4></span>
              </Container>
              <br />

              <div className="d-grid gap-2">
              <Button  size="lg" variant="secondary" href="/collections" >Back </Button> 
              </div>
              
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
  console.debug('blog 1', supplier)
  return { props: { supplier } }
}


