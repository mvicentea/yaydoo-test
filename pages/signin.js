import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Link from 'next/link'
import Router from 'next/router'
import { useUser } from '../lib/hooks'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import AlertMessage from '../components/Views/AlertMessage'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingBottom: "15px"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();

	// Show/hiden Password  
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);
	


	useUser({ redirectTo: '/', redirectIfFound: true })
	const [alertMessage, setAlertMessage] = useState('')
	const [severityMessage, setSeverityMessage] = useState('success')

	async function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const body = Object.fromEntries(formData);

		if (alertMessage) setAlertMessage('');

		try {
			const res = await fetch('/api/login/singin', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			})

			if (res.status === 200) {
				// Router.push('/');
				Router.reload(window.location.origin)
			} else {
				throw new Error(await res.text())
			}
		} catch (error) {
			console.error('An unexpected error happened occurred:', error)
			setAlertMessage(error.message);
			setSeverityMessage(`error`);
		}
	}

	return (
		<Container component="main" maxWidth="xs" className="content-login" id="content-login">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} validate="true">
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						id="password"
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
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link href="/signup" variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
				{alertMessage && <AlertMessage severity={severityMessage} message={alertMessage} />}
			</div>
		</Container>
	);
}