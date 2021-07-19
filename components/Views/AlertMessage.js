import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertMessage({severity='success', message="Put your message"}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          severity={severity}
        >
          {message}
        </Alert>
      </Collapse>
    </div>
  );
}
