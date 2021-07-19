import { useState, useEffect } from 'react'
import clsx from 'clsx'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import LayoutTheme from './LayoutTheme'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import ViewListIcon from '@material-ui/icons/ViewList'
import { motion } from "framer-motion"
import Link from 'next/link'
import uniqueId from '../../utils/uniqueId'

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const menuItems = [
    {
        icon: <HomeIcon />,
        label: 'Home',
        link: '/',
    },
    {
        icon: <ViewListIcon />,
        label: 'Products',
        link: '/products',
    },
    {
        icon: <PeopleIcon />,
        label: 'Users',
        link: '/users',
    },
];


export default function SideNav({ isopen = false, openmenu }) {

    const classes = LayoutTheme();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    useEffect(() => { setOpen(isopen) }, [isopen]);

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,

                })
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={() => openmenu(false)}>
                    {theme.direction === 'rtl' ? <><ChevronRightIcon /> </> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    menuItems.map(item => {
                        return <motion.li
                            variants={variants}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            key={uniqueId()}
                        >
                            <Link href={item.link} key={uniqueId()}>
                                <ListItem button key={text} key={uniqueId()}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.label} />
                                </ListItem>

                            </Link>
                        </motion.li>

                    })
                }
                {/*['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <motion.li
                        
                        variants={variants}
                        whileHover={{ scale: 1.1}}
                        whileTap={{ scale: 0.95 }}
                        key ={uniqueId()}
                    >
                        <ListItem button key={text}  key ={uniqueId()}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </motion.li>
                ))*/}
            </List>
        </Drawer>
    );
}