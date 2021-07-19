import { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import PasswordStrengthBar from 'react-password-strength-bar'
import Link from 'next/link'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import AlertMessage from '../components/Views/AlertMessage'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},

}));

export default function SignUp() {
	const classes = useStyles();
	useUser({ redirectTo: '/', redirectIfFound: true })
	const [alertMessage, setAlertMessage] = useState('')
	const [severityMessage, setSeverityMessage] = useState('success')
	const [passwordValidate, setPasswordValidate] = useState({})

	const [password, setPassword] = useState('');
	// Show/hiden Password  
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = () => setShowPassword(!showPassword)
	// Show/hiden Password confirm 
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const handleClickShowPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);
	const handleMouseDownPasswordConfirm = () => setShowPasswordConfirm(!showPasswordConfirm);

	const [counter, setCounter] = useState();

	useEffect(() => {
		counter > 0 && setTimeout(() => {
			setCounter(counter - 1);
		}, 1000);
	}, [counter]);

	if (counter == 0) {
		Router.push('/signin');
	}

	const handleSubmit = async (e) => {

		e.preventDefault()
		const formData = new FormData(e.target);

		if (alertMessage) setAlertMessage('')
		const body = Object.fromEntries(formData);

		if (passwordValidate.score == 0 || passwordValidate.score == 1) {
			let getPasswordValidation = passwordValidate.feedback;
			console.log("passwordValidate => ", passwordValidate.feedback);
			let msg_warning = getPasswordValidation.warning;
			let msg_suggestions = getPasswordValidation.suggestions;
			let msg_sug = <ul>{msg_suggestions.map((msg, i) => <li key={i}>{msg}</li>)}</ul>;

			setAlertMessage(<>
				<Typography><b>{msg_warning}</b></Typography>
				<Typography><span>Suggestions:</span><br /></Typography>
				{msg_sug}
			</>);
			setSeverityMessage(`error`);
			return;
		}

		if (body.password !== body.passwordConfirm) {
			setAlertMessage(`The passwords don't match`)
			setSeverityMessage(`error`);
			return;
		}

		try {
			const res = await fetch('/api/login/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})

			if (res.status === 200) {
				setCounter(5);
				// ('You are now redistered and can log in');
				let msg = <>
					<span>You are has been successfully registered</span><br />
					<span>will be redirected to the login in: {counter}</span>
				</>;
				setAlertMessage(msg);
				setSeverityMessage(`success`);

			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			setSeverityMessage(`error`);
			setAlertMessage(error.message);
		}
	}


	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} validate="true">
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="name"
								id="name"
								name="name"
								variant="outlined"
								required
								fullWidth
								label="First Name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								name="lastName"
								label="Last Name"
								autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								name="email"
								label="Email Address"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="password"
								name="password"
								label="Password"
								type={showPassword ? "text" : "password"}
								autoComplete="current-password"
								InputProps={{ // <-- This is where the toggle button is added.
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
								value={password}
								onChange={(e) => setPassword(e.target.value)}

							/>
						</Grid>
						<Grid item xs={12}>
							<PasswordStrengthBar
								password={password}
								minLength={5}
								onChangeScore={(score, feedback) => {
									setPasswordValidate({ score, feedback });
									// console.log(score, feedback);
								}}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="passwordConfirm"
								name="passwordConfirm"
								label="Confirm Password"
								type={showPasswordConfirm ? "text" : "password"}
								autoComplete="current-password"
								InputProps={{ // <-- This is where the toggle button is added.
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPasswordConfirm}
												onMouseDown={handleMouseDownPasswordConfirm}
											>
												{showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									)
								}}
							/>
						</Grid>

					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/signin" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>

				{alertMessage && <AlertMessage severity={severityMessage} message={alertMessage} />}
				<div>{counter}</div>
			</div>
		</Container>
	);
}