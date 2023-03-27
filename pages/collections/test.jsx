import Head from 'next/head'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import NavBar from '@/components/navbar';
import NovelCard from '../../components/NovelCard';
import { Container, Image, Row, Col, Table } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import * as React from 'react'


export default function Home({ suppliers }) {

  let [novelTitles, setNovelTitles] = React.useState([])

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
                        handleClick={`/collections/${supplier._id}`}
                        />
                        )
                })
        )       
    setNovelTitles(items)
})

  return (
    <Container>
        <Head>
          <title>Browse Novel</title>
        </Head>

          <br /><Button variant="success" size="sl" style={{ marginLeft: '1rem' }} href="/novels/add"> +Add New Novel </Button><br />
          
          {
            <Row>
                <Col>
                    <Row>
                        {novelTitles}
                    </Row>
                </Col> 
            </Row>
          }

    
    </Container>
    
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/novels/chapters`)
  const suppliers = await res.json()
  
  return { props: { suppliers } }
}