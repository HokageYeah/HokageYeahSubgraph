import React from 'react'
import { Grid, Typography, Box } from '@mui/material'

const Error = ({ error }) => (
  <Grid container direction="column">
    <Grid item>
      <Typography variant="h6" component="h3">
        Error
      </Typography>
    </Grid>
    <Grid item>
      <Grid container>
        <Typography component="div" color="error">
          <Box 
            component="pre" 
            sx={{ 
              fontFamily: 'Inconsolata, Monaco, monospace',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          >
            {JSON.stringify(error, undefined, 2)}
          </Box>
        </Typography>
      </Grid>
    </Grid>
  </Grid>
)

export default Error
