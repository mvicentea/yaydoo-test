import { useState, useEffect, createRef } from 'react';
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '../components/Views/Modal'
import DeleteProductConfirm from '../components/Views/products/DeleteProductConfirm'
import FormUsers from '../components/Views/users/FormUsers'
import AlertMessage from '../components/Views/AlertMessage'
import { useUser } from '../lib/hooks'
import Router from 'next/router'
import DataTable from '../components/Views/DataTable'

const columnsTable = [
    { id: '_id', label: 'ID' },
    { id: 'name', label: 'Name' },
    { id: 'lastName', label: 'Last name' },
    { id: 'email', label: 'Email' },
    { id: 'password', label: 'Password' },
    { id: 'date', label: 'Creation date' },
    { id: 'action', label: 'Action' },

];

const users = ({ user_list }) => {
    const user = useUser();
    const session = user ? true : false;

    const [pageLoad, setPageLoad] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState();
    const [action, setAction] = useState();
    const [userId, setUserId] = useState();

    const [alertMessage, setAlertMessage] = useState('')
    const [severityMessage, setSeverityMessage] = useState('success')

    useEffect(() => { setPageLoad(true), [] });
    useEffect(() => { setOpenModal(openModal) }, [openModal]);
    useEffect(() => { setModalTitle(modalTitle) }, [modalTitle]);

    const ref = createRef();


    var actions = {
        'create': () => userCreate(),
        'edit': () =>userEdit(),
        'delete': () => userDelete()
    };

    const createUser = (e) => {

        setAlertMessage('')
        setOpenModal(true);
        setModalTitle("Add new user");
        setModalBody(<FormUsers />);
        setAction('create');
    }

    const editUser = (id) => {
        setOpenModal(true);
        setModalTitle("User Edit");
        setModalBody(<div>Editar</div>);
        setAction('edit');
        let row = user_list.filter((data) => data._id == id);
        setUserId(id);
        setModalBody(<FormUsers row={row[0]} />);

    }

    const deleteUser = (id) => {
        setOpenModal(true);
        setModalTitle("User Delete");
        setModalBody(<DeleteProductConfirm />);
        setAction('delete');
        setUserId(id);
    }
    const modalConfirmAction = () => {
        const callFuntion = actions[action];
        callFuntion();
    }

    const closeModal = (hide) => {
        setOpenModal(hide);
    }

    const userCreate = async () => {
        const userForm = document.getElementById("user-form");
        const formData = new FormData(userForm);
        userForm.reportValidity();

        if (userForm.checkValidity()) {
            const body = Object.fromEntries(formData);
            try {
                const res = await fetch('/api/login/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                })

                if (res.status === 200) {
                    setAlertMessage('User has been successfully registered');
                    setSeverityMessage(`success`);
                    Router.push('/users')

                } else {
                    throw new Error(await res.text())
                }
            } catch (error) {
                setSeverityMessage(`error`);
                setAlertMessage(error.message);
            }
        }
    }

    const userEdit = async () => {

        const userForm = document.getElementById("user-form");
        const formData = new FormData(userForm);
        userForm.reportValidity();

        if (userForm.checkValidity()) {
            const body = Object.fromEntries(formData);
            const res = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await res.json();
            setAlertMessage('User has been updated')
            setSeverityMessage('success');
            Router.push('/users');
        }

    }

    const userDelete = async () => {
        const res = await fetch(`/api/users/${userId}`, {
            method: "DELETE"
        });
        const response = await res.json();

            setAlertMessage('User has been Deleted')
            setSeverityMessage('success');
            Router.push('/users');
    }

    return (<>
        <Head>
            <title>Users List</title>
            <meta name="user" content="user List" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {
            pageLoad && session && <Container component="main" maxWidth="xl" id="content-users">
                <CssBaseline />
                <Grid id="content-button-create">
                    <Button variant="outlined" color="primary" onClick={createUser}>
                        New User
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
                    <h3 className="text-center text-secondary pt-5">User List</h3>
                    <DataTable rows={user_list} columns={columnsTable} editFun={(id) => editUser(id)} deleteFun={(id) => deleteUser(id)} />
                </Grid>
            </Container>
        }
    </>
    )
}

export default users;


export async function getServerSideProps(context) {
    const res = await fetch(process.env.NEXTAUTH_URL + "/api/users/users");
    const data = await res.json();

    return {
        props: {
            user_list: data
        }
    }
}
