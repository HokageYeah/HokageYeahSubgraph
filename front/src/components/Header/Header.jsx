import React from 'react'
import { Grid, Typography, IconButton } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help'

const Header = ({ onHelp }) => (
  <Grid container direction="row" alignItems="center" spacing={2}>
    <Grid item>
      <Typography variant="h4">The Graph Demo</Typography>
    </Grid>
    <Grid item>
      <IconButton
        aria-label="Help"
        color="secondary"
        onClick={() => onHelp && onHelp()}
      >
        <HelpIcon />
      </IconButton>
    </Grid>
  </Grid>
)

export default Header
