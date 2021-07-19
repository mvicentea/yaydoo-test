import { useState, useEffect, forwardRef } from 'react'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LayoutTheme from './LayoutTheme'
import Link from 'next/link'
import uniqueId from '../../utils/uniqueId'
import { useUser } from '../../lib/hooks';
import Router from 'next/router'




const menulist = [
	{
		icon: <HomeIcon />,
		label: 'Home',
		link: '/',
		static: true,
		viewinsession: true,
	},
	{
		icon: <PersonIcon />,
		label: 'Sign In',
		link: '/signin',
		static: false,
		viewinsession: false,
	},
	{
		icon: <GroupAddIcon />,
		label: 'Sign up',
		link: '/signup',
		static: false,
		viewinsession: false,
	},

	{
		icon: <ExitToAppIcon />,
		label: 'sign out',
		link: '/sinup',
		static: false,
		viewinsession: true,
		action: (fn) => fn
	}

];


const NavBar = ({ isopen = false, openmenu }) => {
	const user = useUser();
	const session = user ? true : false;

	const classes = LayoutTheme();
	const [open, setOpen] = useState(isopen);
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	useEffect(() => { setOpen(isopen) }, [isopen]);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const signOut = async () => {
		const res = await fetch('/api/login/singout', { method: 'get' });
		Router.push('/');
		Router.reload(window.location.origin)
	}

	const mobileMenuId = 'menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{menulist.map((item) => {
				let action = item.hasOwnProperty('action');
				if (!action && item.static || !item.viewinsession && !session) {
					return <Link href={item.link} key={uniqueId()}>
						<MenuItem key={uniqueId()}>
							<IconButton aria-label="show" color="inherit" key={uniqueId()}>
								{item.icon}
							</IconButton>
							<p>{item.label}</p>
						</MenuItem>
					</Link>
				} else if (!action && item.viewinsession && session) {
					return <Link href={item.link} key={uniqueId()}>
						<MenuItem key={uniqueId()}>
							<IconButton color="inherit">
								{item.icon}
							</IconButton>
							<p>{item.label}</p>
						</MenuItem>
					</Link>
				} else if (action && item.viewinsession && session) {
					return <MenuItem key={uniqueId()} onClick={(a) => item.action(signOut())} >
						<IconButton key={uniqueId()}>
							{item.icon}
						</IconButton>
						{item.label}
					</MenuItem>
				}
			})}
		</Menu>
	);
	return (<>
		<AppBar
			position="fixed"
			className={clsx(classes.appBar, {
				[classes.appBarShift]: open,
			})}
		>
			<Toolbar>
				{session && <IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					className={clsx(classes.menuButton, {
						[classes.hide]: open,
					})}
					onClick={() => openmenu(true)}
				>
					<MenuIcon />
				</IconButton>
				}
				<Typography className={classes.title} variant="h6" noWrap>
					Yaydoo Test
				</Typography>
				<div className={classes.grow} />
				<div className={classes.sectionDesktop}>
					{
						menulist.map((item) => {
							let action = item.hasOwnProperty('action');
							if (!action && item.static || !item.viewinsession && !session) {
								return <Link href={item.link} key={uniqueId()}>
									<Button startIcon={item.icon} color="inherit" key={uniqueId()}>
										{item.label}
									</Button>
								</Link>
							} else if (!action && item.viewinsession && session) {
								return <Link href={item.link} key={uniqueId()}>
									<Button startIcon={item.icon} color="inherit" key={uniqueId()}>
										{item.label}
									</Button>
								</Link>
							} else if (action && item.viewinsession && session) {
								return <Button startIcon={item.icon} color="inherit" onClick={(a) => item.action(signOut())} key={uniqueId()}>
									{item.label}
								</Button>
							}

						})
					}

				</div>
				<div className={classes.sectionMobile}>
					<IconButton
						aria-label="show more"
						aria-controls={mobileMenuId}
						aria-haspopup="true"
						onClick={handleMobileMenuOpen}
						color="inherit"
					>
						<MoreIcon />
					</IconButton>
				</div>
			</Toolbar>
		</AppBar>
		{renderMobileMenu}
	</>
	);
}

export default NavBar;