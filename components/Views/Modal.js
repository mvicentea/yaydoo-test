import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export default function Modal({headertitle = "", show = false, hide, confirm, children }) {
	
	const [open, setOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => { setMounted(true),[]});

	useEffect((show) => { setOpen(show),[]});
	

	const handleClose = () => {setOpen(false);};

	// useEffect(() => {setOpen(show)}, []);

	return (
		
		<div>
			{mounted && <Dialog onClose={hide()} aria-labelledby="customized-dialog-title" open={show}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					{headertitle}
				</DialogTitle>
				<DialogContent dividers>
					{children}
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="secondary">
						Cancel
					</Button>
					<Button autoFocus onClick={() => confirm()} color="primary">
						Send
					</Button>
				</DialogActions>
	</Dialog>}
		</div>
	);
}
