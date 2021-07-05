import Head from 'next/head'
import Table from "../components/Table"
import AlertSession from '../components/AlertSession'
import { useUser } from '../lib/hooks'


export async function getStaticProps(context){
    const res = await fetch("https://yaydoo-test.vercel.app/api/users");
    const data = await res.json();
  
    return {
        props:{
            user_list : data
        }
    }
  }


const products = ({user_list}) => {
    const user = useUser();
    return (<>
            <Head>
                <title>Users List</title>
                <meta name="user" content="user List" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h3 className="text-center text-secondary pt-5">Users List</h3>
            {
                user ? <Table data={user_list} image={true} fildImage='mediaUrl'/> : 
                <AlertSession/>
            }
       </>
    )
}

export default products;