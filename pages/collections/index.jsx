import Head from 'next/head'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import NavBar from '@/components/navbar';
import Button from 'react-bootstrap/Button';
import Image from 'next/image'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';



export default function Home({ suppliers }) {



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

  return (
    <>
        <Head>
          <title>Supplier Records</title>
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
            width: '90vw',
            backgroundColor: "#4D4D4D"
        }}>
            <br /><h2 style={{color: "#B46060", textAlign: "center"}}><b>Supplier Records Management</b></h2><br />
      </div>

      <div style={{
            margin: 'auto',
            height: '0.5vh',
            width: '90vw',
            backgroundColor: "#B46060"
        }} >
      </div>

      <div style={{
            margin: 'auto',
            height: '2vh',
            width: '90vw',
            backgroundColor: "#B867070"
        }} >
          
      </div>

      
      <div style={{
            margin: 'auto',
            height: '100vh',
            width: '90vw',
            backgroundColor: "rgba(0,0,0,0.7)",
        
        }}>

        
        <br />

        <Button variant="success" size="sl" style={{ marginLeft: '1rem' }} href="/novels/add"> +Add New Novel </Button>
        
        <br />
        
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={{width: '10rem', textAlign: "center"} }>Author</th>
              <th style={{width: '10rem', textAlign: "center"}}>Title</th>
              <th style={{width: '15rem', textAlign: "center"}}>Synopsis</th>
              <th style={{width: '8rem', textAlign: "center"}}>Date Publish</th>
              <th style={{width: '20rem', textAlign: "center"}}>Content</th>
              <th style={{width: '8rem', textAlign: "center"}}>Update Record</th>
              <th style={{width: '8rem', textAlign: "center"}}>Delete Record</th>
            </tr>
          </thead>

          <tbody>
            {
              suppliers.map(supplier => {
                return ( 
                    <tr key={supplier._id}>

                      <td style={{textAlign:'center'}}>
                        <Link href={`/novels/${supplier._id}`}>
                          {supplier.name}
                        </Link>
                      </td>

                      <td style={{textAlign:'center'}}>{supplier.address}</td>

                      <td style={{textAlign:'center'}}>{supplier.phone}</td>

                      <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Image
                                alt=""
                                src="/edit.ico"
                                width="15"
                                height="15"
                                className="d-inline-block align-top"
                            />{' '}
                            <Link href={`/novels/update/${supplier._id}`}>Update</Link> 
                      </td>

                      <td>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Button variant="danger"  onClick={() => deleteBlog(supplier._id)}>Delete</Button></td>

                    </tr>
                )
              })
            }
          </tbody>
        </Table>

      <hr/>
      </div>
    </>
    
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/novels/chapters`)
  const suppliers = await res.json()
  
  return { props: { suppliers } }
}