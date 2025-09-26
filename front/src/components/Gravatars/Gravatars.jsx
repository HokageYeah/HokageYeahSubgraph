import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Box,
} from '@mui/material'

const Gravatar = ({ id, displayName, imageUrl, owner, internal_id }) => (
  <Grid item>
    <Card>
      <CardActionArea sx={{ maxWidth: 300 }}>
        {imageUrl && (
          <CardMedia 
            sx={{ height: 150 }} 
            image={imageUrl} 
            title={displayName} 
          />
        )}
        <CardContent>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {displayName || '—'}
          </Typography>
          <Typography color="textSecondary">ID</Typography>
          <Typography 
            component="p" 
            sx={{ 
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '0.75rem'
            }}
          >
            {id}
          </Typography>
          {internal_id && (
            <>
              <Typography color="textSecondary">Internal ID</Typography>
              <Typography 
                component="p" 
                sx={{ 
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {internal_id}
              </Typography>
            </>
          )}
          <Typography color="textSecondary">Owner</Typography>
          <Typography 
            component="p" 
            sx={{ 
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              fontSize: '0.75rem'
            }}
          >
            {owner}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const Gravatars = ({ gravatars }) => (
  <Grid container direction="column" spacing={2}>
    <Grid item>
      <Typography variant="h4" sx={{ marginTop: 2 }}>
        {gravatars.length} Gravatars
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={2}>
        {gravatars.map(gravatar => (
          <Gravatar key={gravatar.id} {...gravatar} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default Gravatars
