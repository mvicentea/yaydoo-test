
import { useRef, useState, useEffect} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, ModalFooter} from 'reactstrap';
import Router from 'next/router'

const ProductsForm = ({action, idproduct}) => {
    
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setsuccessMsg] = useState('');
    
    const refForm = useRef(null);



    const handleSeveProduct = async (products_list) => {

        let form = document.getElementById('form-prdoduc');
        const formData = new FormData(form);
	
		if (errorMsg) setErrorMsg('')
		
        const body = Object.fromEntries(formData);
        if ( !body.name || !body.price || !body.quantity || !body.available || !body.sku || !body.description)
            return setErrorMsg(`Please fiil in requiered fields`)
		
		try {
			const res = await fetch('/api/product/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			
			if (res.status === 200) {
				setsuccessMsg('Product has been registered');
                Router.push('/products')

			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error('An unexpected error happened occurred:', error)
			setErrorMsg(error.message)
		}
    }

  
  return (<>
    <Form ref={refForm} id="form-prdoduc">
        <FormGroup>
            <Label for="name">Product Name</Label>
            <Input type="text" name="name" id="name" placeholder="Product Name" required/>
          </FormGroup>
        <Row>
            <Col md={4}>
            <FormGroup>
                <Label for="price">price</Label>
                <Input type="number" name="price" id="price" placeholder="price" step="any" required/>
            </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                <Label for="quantity">Quantity</Label>
                <Input type="number" name="quantity" id="quantity" placeholder="Quantity" required/>
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup>
                <Label for="available">Available</Label>
                <Input type="number" name="available" id="available" placeholder="Available" required/>
                </FormGroup>
            </Col>
        </Row>
      
      <FormGroup>
        <Label for="sku">SKU</Label>
        <Input type="text" name="sku" id="sku" placeholder="SKU"/>
      </FormGroup>
      <Row form>
        <Col>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="text" name="description" id="description"/>
          </FormGroup>
        </Col>
        <Col >
          <FormGroup>
            <Label for="mediaUrl">Media Url</Label>
            <Input type="text" name="mediaUrl" id="mediaUrl"/>
          </FormGroup>
        </Col>
      </Row>
      <br/>
      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}
     <br/>
      <ModalFooter>
          <Button color="primary" onClick={handleSeveProduct}>Save</Button>
        </ModalFooter>
    </Form>
    <style jsx>{`
				.error {
                    color: brown;
                    margin: 1rem 0 0;
                  }

                  .success {
                    color: green;
                    margin: 1rem 0 0;
                  }
        	}`}</style>
    </>
  );
}

export default ProductsForm;