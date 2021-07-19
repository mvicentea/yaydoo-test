import { makeStyles } from '@material-ui/core/styles'


const drawerWidth = 240;
const LayoutTheme = makeStyles((theme) => ({
    root: {
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
        flexGrow: 1,
    },
    
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    content: {
        flexGrow: 1,
        padding:'1rem 3rem',
        paddingRight: "0px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding:0,
        marginRight: "0px",
        marginLeft: "0px"

        // padding: theme.spacing(9),
    },

    main: {
        minHeight: '97vh',
        minWidth: '100vw',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '0px',
        marginRight: '0px'
      },
    hide: {
        display: 'none',
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    /* drawer styles */

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        background: 'seashell'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },

}));

export default LayoutTheme;