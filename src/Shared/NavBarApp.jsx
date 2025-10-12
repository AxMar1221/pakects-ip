import { AppBar, Container, MenuItem, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const NavBarApp = () => {
  return (
    <div className='navbar bg-light-100 container mb-5'>
      <AppBar color='error'>
        <Container>
          <Toolbar
            disableGutters
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <MenuItem sx={{ borderRadius: 3 }}>
              <NavLink
                to="/home"
                style={{ textDecoration: 'none', color: 'white' }}
                activeClassName="active"
              >
                <Typography variant='h6'>Inicio</Typography>
              </NavLink>
            </MenuItem>

            <MenuItem sx={{ borderRadius: 3 }}>
              <NavLink
                to="/packets"
                style={{ textDecoration: 'none', color: 'white' }}
                activeClassName="active"
              >
                <Typography variant='h6'>Decodificador</Typography>
              </NavLink>
            </MenuItem>


          </Toolbar>
        </Container>

      </AppBar>
    </div>
  )
}