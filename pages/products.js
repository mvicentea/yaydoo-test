import { useState, useEffect} from 'react';
import Head from 'next/head'
import Table from "../components/Table"
import AlertSession from '../components/AlertSession'
import ModalUI from '../components/Modal'
import ProductsForm from '../components/ProductsForm'
import { useUser } from '../lib/hooks'
import Router from 'next/router'



export async function getServerSideProps(context){

    const res = await fetch(process.env.NEXTAUTH_URL+"/api/products");
    const data = await res.json();
  
    return {
        props:{
            products_list : data
        }
    }
  }

const products = ({products_list}) => {
    const user = useUser();
    const [action, setAction] =  useState ('create');
    const [product, setProduct] = useState({});

    const editProduct =  async (id) => {
        let product_f = await findProduct(id);
        console.log("product => ", product_f);
    }

    const deleteProduct = async (id)  => {
        const res = await fetch(`/api/product/${id}`,{
            method: "DELETE"
        });
        await res.json();
        Router.push('/products');
    }

    const findProduct = async (id) => {
        const res = await fetch(`/api/product/${id}`);
        const data_p = await res.json();
        setProduct(data_p);
        return (data_p);
    }


    return (<>
            <Head>
                <title>Yaydoo Test</title>
                <meta name="Products" content="Product List" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className = "row-cols-auto">
                <div className= "col">
                    <h3 className="text-center text-secondary pt-5">Products List</h3>
                </div>
            </div>
            
            {user && <ModalUI labelButto='New Product' title="Product" id ="modalProducts" classname="Info">
                <ProductsForm/>
            </ModalUI>}

            
            {
                user ? <Table data={products_list} image={true} fildImage='mediaUrl' editFun={(id) => editProduct(id)}  deleteFun={(id) => deleteProduct(id)}/> : 
                <AlertSession />
            }
            
       </>
    )
}

export default products;