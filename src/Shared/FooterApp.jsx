import { Box, IconButton, Link, Typography } from "@mui/material"
import { GitHub, WhatsApp } from "@mui/icons-material";

let currentYear = new Date().getFullYear();
const tab = <>&nbsp;&nbsp;</>;

export const FooterApp = () => {

  return (
    <div className="container">
      <Box className="footer">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://avatars.githubusercontent.com/u/85906328?v=4" alt="avatar-github" className="avatar-github" />
          <Typography variant="body2" align="center">
            {tab}Mario Hernández Profe Tachi
          </Typography>
        </Box>
        <Typography variant="body2" align="center">
          &copy; <span>{currentYear}</span> Todos los derechos reservados.
        </Typography>
        <Link href="https://github.com/AxMar1221" target="_blank" rel="noopener noreferrer" sx={{ marginLeft: 1 }}>
          <IconButton arial-label="GitHub">
            <GitHub color='error' />
          </IconButton>
        </Link>
        <Link href="https://wa.me/522222592173?text=Hola%20Tachi%20quiero%20ponerme%20en%20contacto%20contigo" target="_blank" rel="noopener noreferrer" sx={{ marginLeft: 1 }}>
          <IconButton arial-label="WhatsApp">
            <WhatsApp color='error' />
          </IconButton>
        </Link>
      </Box>
    </div>
  )
}