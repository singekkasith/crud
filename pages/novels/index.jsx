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
            <br /><h2 style={{color: "#B46060", textAlign: "center"}}><b>Novels Archive</b></h2><br />
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
              <th style={{width: '10rem', textAlign: "center"}}>Date Publish</th>
              <th style={{width: '10rem', textAlign: "center"}}>Last Update</th>
              <th style={{width: '8rem', textAlign: "center"}}>Status</th>
              <th style={{width: '15rem', textAlign: "center"}}>Synopsis</th>
              <th style={{width: '20rem', textAlign: "center"}}>Content</th>
              <th style={{width: '20rem', textAlign: "center"}}>ImageUrl</th>
              <th style={{width: '6rem', textAlign: "center"}}></th>
            
            </tr>
          </thead>

          <tbody>
            {
              suppliers.map(supplier => {
                return ( 
                    <tr key={supplier._id}>

                      <td style={{textAlign:'center'}}>{supplier.author}</td>

                      <td style={{textAlign:'center'}}>
                        <Link href={`/novels/${supplier._id}`}>
                          {supplier.title}
                        </Link>
                      </td>

                      <td style={{textAlign:'center'}}>{supplier.datePublish}</td>
                      <td style={{textAlign:'center'}}>{supplier.dateUpdate}</td>

                      <td style={{textAlign:'center'}}>{supplier.status}</td>


                      <td style={{textAlign:'center'}}>{supplier.synopsis}</td>

                      <td style={{textAlign:'center'}}>{supplier.content}</td>

                      <td style={{textAlign:'center'}}>{supplier.imgUrl}</td>

                      <td>
                            &nbsp;
                            
                            <Link href={`/novels/updates/${supplier._id}`}><Image
                                alt=""
                                src="/edit.ico"
                                width="20"
                                height="20"
                                className="d-inline-block align-top"
                            />{''}</Link> 

                            &nbsp;&nbsp;&nbsp;&nbsp;

                            <Image onClick={() => deleteBlog(supplier._id)}
                                alt=""
                                src="/bin.ico"
                                width="20"
                                height="20"
                                className="d-inline-block align-top"
                            />{' '}
                      </td>




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
  const res = await fetch(`/api/novels/chapters`)
  const suppliers = await res.json()
  
  return { props: { suppliers } }
}

