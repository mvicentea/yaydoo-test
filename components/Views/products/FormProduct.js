import { useState, forwardRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AlertMessage from '../AlertMessage'

import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

export default function FormProduct({message='', severity='success', row}) {

    const classes = useStyles();
    const [alertMessage, setAlertMessage] = useState(message)
    const [severityMessage, setSeverityMessage] = useState(severity)
    const [load, setLoad] = useState(false);
    const [values, setValues] = useState({
        name:'',
        price:'',
        quantity:'',
        available: '',
        sku:'',
        description:'',
        mediaUrl:''
    });

    useEffect(() => { setLoad(true), [] });
    useEffect(() => { setAlertMessage(message) }, [message]);
    useEffect(() => { setSeverityMessage(severity) }, [severity]);
    useEffect(() => {setValues(row)}, [row]);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
        load &&<div className={classes.root} >
             <Grid>{alertMessage && <AlertMessage severity={severityMessage} message={alertMessage} />}</Grid>
            <form validate="true" id='product-form'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="name">Product Name</InputLabel>
                            <OutlinedInput
                                id="name"
                                name="name"
                                value={(typeof values !=='undefined') ? values.name :""}
                                onChange={handleChange('name')}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                labelWidth={108}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="price">Amount</InputLabel>
                            <OutlinedInput
                                id="price"
                                name="price"
                                value={(typeof values !=='undefined') ? values.price :""}
                                onChange={handleChange('price')}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={60}
                                shrink="true"
                                type="number"
                                step="any"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="quantity">Quantity</InputLabel>
                            <OutlinedInput
                                id="quantity"
                                name="quantity"
                                value={(typeof values !=='undefined') ? values.quantity :""}
                                onChange={handleChange('quantity')}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                labelWidth={60}
                                shrink="true"
                                type="number"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="available">Available</InputLabel>
                            <OutlinedInput
                                id="available"
                                name="available"
                                value={(typeof values !=='undefined') ? values.available :""}
                                onChange={handleChange('available')}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                labelWidth={65}
                                shrink="true"
                                type="number"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="sku">SKU</InputLabel>
                            <OutlinedInput
                                id="sku"
                                name="sku"
                                value={(typeof values !=='undefined') ? values.sku :""}
                                onChange={handleChange('sku')}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                labelWidth={30}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <OutlinedInput
                                id="description"
                                name="description"
                                value={(typeof values !=='undefined') ? values.description :""}
                                onChange={handleChange('description')}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                labelWidth={85}
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                            <InputLabel htmlFor="mediaUrl">Media Url</InputLabel>
                            <OutlinedInput
                                id="mediaUrl"
                                name="mediaUrl"
                                value={(typeof values !=='undefined') ? values.mediaUrl :""}
                                onChange={handleChange('mediaUrl')}
                                startAdornment={<InputAdornment position="start"></InputAdornment>}
                                labelWidth={70}
                                required
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
