import { useState, useEffect, forwardRef } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import PasswordStrengthBar from 'react-password-strength-bar'
import Router from 'next/router'
import AlertMessage from '../AlertMessage'

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

// export default function SignUp() {
const FormUsers = ({row}) => {

	const classes = useStyles();
	const [alertMessage, setAlertMessage] = useState('')
	const [severityMessage, setSeverityMessage] = useState('success')
	const [passwordValidate, setPasswordValidate] = useState({})
    const [values, setValues] = useState({
        name:'',
        lastName:'',
        email:'',
        password: ''
    });

    useEffect(() => {setValues(row)}, [row]);

	const [password, setPassword] = useState('');
	// Show/hiden Password  
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword(!showPassword)
	const handleMouseDownPassword = () => setShowPassword(!showPassword)
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
	return (<>
				<form  validate="true" id="user-form">
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="name"
								id="name"
								name="name"
                                value={(typeof values !=='undefined') ? values.name :""}
								variant="outlined"
								required
								fullWidth
								label="First Name"
                                onChange={handleChange('name')}
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
                                value={(typeof values !=='undefined') ? values.lastName :""}
								label="Last Name"
								autoComplete="lname"
                                onChange={handleChange('lastName')}
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
                                onChange={handleChange('email')}
                                value={(typeof values !=='undefined') ? values.email :""}
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

					</Grid>
				</form>
				{alertMessage && <AlertMessage severity={severityMessage} message={alertMessage} />}
			</>
	);
};

export default FormUsers;