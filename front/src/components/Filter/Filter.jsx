import React from 'react'
import {
  Grid,
  Select,
  FormControlLabel,
  MenuItem,
  Checkbox,
  Box,
  InputLabel,
  FormControl,
} from '@mui/material'

const Filter = ({
  onToggleWithName,
  onToggleWithImage,
  onOrderBy,
  withName,
  withImage,
  orderBy,
}) => (
  <Grid item>
    <Grid container direction="row" alignItems="center" spacing={2}>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={withName}
              onChange={event => onToggleWithName && onToggleWithName()}
            />
          }
          label="With names"
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              checked={withImage}
              onChange={event => onToggleWithImage && onToggleWithImage()}
            />
          }
          label="With images"
        />
      </Grid>
      <Grid item>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="order-by-label">Order By</InputLabel>
            <Select
              labelId="order-by-label"
              value={orderBy}
              label="Order By"
              onChange={event => onOrderBy && onOrderBy(event.target.value)}
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="internal_id">Internal ID</MenuItem>
              <MenuItem value="displayName">Name</MenuItem>
              <MenuItem value="owner">Owner</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  </Grid>
)

export default Filter
