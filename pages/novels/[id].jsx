
import Head from "next/head"
import Link from "next/link"

import NavBar from '@/components/navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { Container, Image, Row, Col, Table } from 'react-bootstrap';


// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  console.log('blog 2', supplier)
  if (!supplier) return (
    <div>
      <p>Record not found</p>
      <Link href="/novels">Back</Link>
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
            height: '12vh',
            width: '100vw',
            backgroundColor: "#191825"
        }} class="border-bottom ">
            <br /><h2 style={{color: "#B46060", textAlign: "center"}}><b>{supplier.title}</b></h2><br />
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
                              <Card.Img variant="top" src="/library-browse.webp" 
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
                backgroundColor: "#191825",
                borderRadius: "15px"
            }} >
              
              <Container>
              <h3 style={{color: "#66347F"}} ><b>Content</b></h3><br />
              <h6 style={{color: "#9E4784"}} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{supplier.content}</h6>
              </Container>
              <br />

              <div className="d-grid gap-2">
              <Button  size="lg" variant="secondary" href="/novels" >Back </Button> 
              </div>
              
            </div>
            
            
        </div>        
     

      
    </>
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`http://localhost:3000/api/novels/chapters/${params.id}`)
  const supplier = await res.json()
  console.debug('blog 1', supplier)
  return { props: { supplier } }
}
