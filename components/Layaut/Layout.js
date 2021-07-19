import { useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Copyright from '../../src/Copyright'
import NavBar from './NavBar'
import SideNav from './SideNav'
import LayoutTheme from './LayoutTheme'
import Grid  from '@material-ui/core/Grid'
import { useUser } from '../../lib/hooks';

const Layout = ({ children }) => {
    const classes = LayoutTheme();
    const [open, setOpen] = useState(false);

    const user = useUser();
	const session = user ? true:false;

    const handlerOpen = (isopen) => {
        setOpen(isopen);
    }

    return (
        <Grid className={classes.root}>
            <CssBaseline />
            <NavBar isopen={open} openmenu={(isOpen) => handlerOpen(isOpen)} />
            {session && <SideNav isopen={open} openmenu={(isOpen) => handlerOpen(isOpen)} />}
            <main className={classes.main} id="main-layout">
                <div className={classes.toolbar} />
                <Container fixed className={classes.content} id="content-layout"> 
                        {children}
                </Container>
            </main>
        </Grid>
    );
}


export default Layout;