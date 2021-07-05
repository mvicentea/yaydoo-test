import NavBar from "./NavBar";
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css'


const Layout = ({children}) => {
	
	return (<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel = "stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
				<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossOrigin="anonymous"></script>
			</Head>
			<Container fluid id="main-container">
                <Row className="row">	
					<NavBar/>
					<Col> {children} </Col>
				</Row>
			</Container>
        </>)
}

export default Layout;