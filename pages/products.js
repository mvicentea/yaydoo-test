import { useState, useEffect, createRef } from 'react';
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '../components/Views/Modal'
import DeleteProductConfirm from '../components/Views/products/DeleteProductConfirm'
import FormProduct from '../components/Views/products/FormProduct'
import AlertMessage from '../components/Views/AlertMessage'
import { useUser } from '../lib/hooks'
import Router from 'next/router'
import DataTable from '../components/Views/DataTable'

const productThemex = makeStyles({
    content: {
        paddingTop: 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        flexGrow: 1,
    }
});

const styles = (theme) => ({
    content: {
        paddingTop: 60
    }
});

const columnsTable = [
    { id: '_id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'price', label: 'Price', align: 'right', format: (value) => value.toLocaleString('en-US') },
    { id: 'quantity', label: 'Quantity' },
    { id: 'available', label: 'Available' },
    { id: 'sku', label: 'SKU' },
    { id: 'description', minHeight: 170, label: 'Description' },
    { id: 'mediaUrl', label: 'Media Url', image: true },
    { id: 'action', label: 'Action' },

];

const products = ({ products_list }) => {

    const user = useUser();
	const session = user ? true:false;

    const [pageLoad, setPageLoad] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState();
    const [action, setAction] = useState();
    const [idProduct, setIdProduct] = useState();

    const [alertMessage, setAlertMessage] = useState('')
    const [severityMessage, setSeverityMessage] = useState('success')

    useEffect(() => { setPageLoad(true), [] });
    useEffect(() => { setOpenModal(openModal) }, [openModal]);
    useEffect(() => { setModalTitle(modalTitle) }, [modalTitle]);

    const classes = styles();

    var actions = {
        'create': () => produtCreate(),
        'edit': () => productEdit(),
        'delete': () => productDelete()
    };

    const createProduct = () => {
        setAlertMessage('')
        setOpenModal(true);
        setModalTitle("Add new product");
        setModalBody(<FormProduct />);
        setAction('create');
    }

    const editProduct = (id) => {
        setOpenModal(true);
        setModalTitle("Edit product");
        setModalBody(<div>Editar</div>);
        setAction('edit');
        let row = products_list.filter((data) => data._id == id);
        setIdProduct(id);
        setModalBody(<FormProduct row={row[0]} />);

    }

    const deleteProduct = (id) => {
        setOpenModal(true);
        setModalTitle("Delete product");
        setModalBody(<DeleteProductConfirm />);
        setAction('delete');
        setIdProduct(id);
    }

    const produtCreate = async () => {
        const productform = document.getElementById("product-form");
        const formData = new FormData(productform);
        productform.reportValidity();

        if (productform.checkValidity()) {
            const body = Object.fromEntries(formData);
            try {
                const res = await fetch('/api/products/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })

                if (res.status === 200) {
                    setAlertMessage('Product has been registered')
                    setSeverityMessage('success');
                    Router.push('/products')

                } else {
                    throw new Error(await res.text())
                }
            } catch (error) {
                console.error('An unexpected error happened occurred:', error)
                setAlertMessage(error.message)
                setSeverityMessage('warning')
            }
        }

    }

    const productEdit = async () => {

        const productform = document.getElementById("product-form");
        const formData = new FormData(productform);
        productform.reportValidity();

        if (productform.checkValidity()) {
            const body = Object.fromEntries(formData);
            const res = await fetch(`/api/products/${idProduct}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await res.json();
            setAlertMessage('Product has been updated')
            setSeverityMessage('success');
            Router.push('/products');
        }

    }

    const productDelete = async () => {
        const res = await fetch(`/api/products/${idProduct}`, {
            method: "DELETE"
        });
        const response = await res.json();

            setAlertMessage('Product has been Deleted')
            setSeverityMessage('success');
            Router.push('/products');
    }

    const findProduct = async (id) => {
        const res = await fetch(`/api/product/${id}`);
        const data_p = await res.json();
        setProduct(data_p);
        return (data_p);
    }


    const modalConfirmAction = () => {
        const callFuntion = actions[action];
        callFuntion();
    }

    const closeModal = (hide) => {
        setOpenModal(hide);
    }


    return (<>
            <Head>
                <title>Products</title>
                <meta name="products" content="Product List" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
            pageLoad && session && <Container component="main" maxWidth="xl" id="content-products">
            <CssBaseline />
            <Grid id="content-button-create">
            
                <Button variant="outlined" color="primary" onClick={createProduct}>
                    New Product
                </Button>
                <Modal
                    headertitle={modalTitle}
                    show={openModal}
                    hide={closeModal}
                    confirm={modalConfirmAction}

                >
                    {modalBody}
                </Modal>
            </Grid>
            <Grid>{alertMessage && <AlertMessage severity={severityMessage} message={alertMessage} />}</Grid>
            <Grid>
                <h3 className="text-center text-secondary pt-5">Producst</h3>
                <DataTable rows={products_list} columns={columnsTable} editFun={(id) => editProduct(id)} deleteFun={(id) => deleteProduct(id)} />
            </Grid>
        </Container>}
    </>
    )
};
export async function getServerSideProps(context) {

    const res = await fetch(process.env.NEXTAUTH_URL + "/api/products/products");
    const data = await res.json();

    return {
        props: {
            products_list: data
        }
    }
}
export default products;
