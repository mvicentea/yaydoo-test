import { useState } from 'react'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import Form from '../components/form'

const Signup = () => {
	useUser({ redirectTo: '/', redirectIfFound: true })
	const [errorMsg, setErrorMsg] = useState('')
	const [successMsg, setsuccessMsg] = useState('')
	
	
	const handleSubmit = async (event) => {
		
		event.preventDefault()
        const formData = new FormData(event.target);
    
	
		if (errorMsg) setErrorMsg('')
		const body = Object.fromEntries(formData);
		
		if (body.password !== body.passwordConfirm) {
			setErrorMsg(`The passwords don't match`)
			return
		}
		try {
			const res = await fetch('/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})
			
			if (res.status === 200) {
				setsuccessMsg('You are now redistered and can log in');
				Router.push('/login')
			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error('An unexpected error happened occurred:', error)
			setErrorMsg(error.message)
		}
	}
	return (<>
		<main id="login">
			<h3 className="text-center text-secondary pt-5">Register form</h3>
			<div className="login">
				<Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} successMessage={successMsg} />
			</div>
			</main>
			
			<style jsx>{`
				.login {
          		max-width: 21rem;
          		margin: 0 auto;
          		padding: 1rem;
          		border: 1px solid #ccc;
          		border-radius: 4px;
        	}`}</style>
    </>)
}

export default Signup
