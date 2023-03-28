import Head from 'next/head'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import NavBar from '@/components/navbar';
import NovelCard from '../../components/NovelCard';
import { Container, Image, Row, Col, Table } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import * as React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';




export default function Home({ suppliers }) {

  let [novelTitles, setNovelTitles] = React.useState([])

  

  React.useEffect(() => {
    let items = []
        items.push(
            suppliers.map(supplier => {
                return ( 
                    <NovelCard 
                        key={supplier._id}
                        author={supplier.author}
                        title={supplier.title}
                        synopsis={supplier.synopsis}
                        datePublish={supplier.dateSynopsis}
                        imgUrl={supplier.imgUrl}
                        handleClick={`/collections/${supplier._id}`}
                        />
                        )
                })
        )       
    setNovelTitles(items)
})

  return (
    <>
        <Head>
          <title>Browse Novel</title>
        </Head>

        <div style={{
            zIndex: -10,
            position: 'fixed',
            height: '100vh',
            width: '100vw'
        }}>
            <Image
                src="/mainBg.webp"
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
            backgroundColor: "#4D4D4D"
        }}>
            <br /><h2 style={{color: "#B46060", textAlign: "center"}}><b>Novels Collections</b></h2><br />
      </div>

      <div style={{
            margin: 'auto',
            height: '0.5vh',
            width: '100vw',
            backgroundColor: "#B46060"
        }} >
      </div>

      <div style={{
            margin: 'auto',
            height: '2vh',
            width: '100vw',
            backgroundColor: "#B867070"
        }} >
          
      </div>

      
      <div style={{
            margin: 'auto',
            height: '100rem',
            
            backgroundColor: "rgba(0,0,0,0.7)",
        
        }}>

          <br /><Button variant="success" size="sl" style={{ marginLeft: '1rem' }} href="/collections/add"> Create a Novel </Button><br />
    
          {
            <Container >
              <Row>
                <Col>
                    <Row>
                        {novelTitles}
                    </Row>
                </Col> 
              </Row>
            </Container>
          }
          

      
      </div>
    </>
    
  );
}

export async function getServerSideProps() {
  const res = await fetch(`APIURL/api/novels/chapters`)
  const suppliers = await res.json()
  
  return { props: { suppliers } }
}