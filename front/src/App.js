import React, { useState } from 'react'
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import {
  Grid,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import './App.css'
import Header from './components/Header'
import Error from './components/Error'
import Gravatars from './components/Gravatars'
import Filter from './components/Filter'

// The Graph subgraph endpoint
const url = process.env.REACT_APP_GRAPHQL_ENDPOINT
const headers = { Authorization: `Bearer ${process.env.REACT_APP_GRAPHQL_API_KEY}` }

// Updated GraphQL query for the new subgraph
const GRAVATARS_QUERY = gql`{
  newGravatars(first: 5) {
    id
    internal_id
    owner
    displayName
  }
  updatedGravatars(first: 5) {
    id
    internal_id
    owner
    displayName
  }
}`

// Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// Main data fetching component with filter functionality
const GravatarsQueryComponent = ({ withImage, withName, orderBy }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['gravatars'],
    queryFn: async () => {
      return await request(url, GRAVATARS_QUERY, {}, headers)
    }
  })

  if (isLoading) return <LinearProgress style={{ width: '100%' }} />
  
  if (error) return <Error error={error} />

  // Combine and process the data
  const newGravatars = data?.newGravatars || []
  const updatedGravatars = data?.updatedGravatars || []
  
  // Combine all gravatars and add imageUrl field (empty for now, but maintains compatibility)
  let allGravatars = [
    ...newGravatars.map(g => ({ ...g, imageUrl: '' })),
    ...updatedGravatars.map(g => ({ ...g, imageUrl: '' }))
  ]

  // Apply filters
  if (withName) {
    allGravatars = allGravatars.filter(g => g.displayName && g.displayName.trim() !== '')
  }
  
  if (withImage) {
    // Since we don't have imageUrl in the new schema, this filter won't affect results
    // but we keep it for UI consistency
    allGravatars = allGravatars.filter(g => g.imageUrl && g.imageUrl.startsWith('http'))
  }

  // Apply sorting
  allGravatars.sort((a, b) => {
    const aValue = a[orderBy] || ''
    const bValue = b[orderBy] || ''
    return aValue.toString().localeCompare(bValue.toString())
  })

  return <Gravatars gravatars={allGravatars} />
}

function App() {
  const [withImage, setWithImage] = useState(false);
  const [withName, setWithName] = useState(false);
  const [orderBy, setOrderBy] = useState('displayName');
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  const toggleHelpDialog = () => {
    setShowHelpDialog(!showHelpDialog);
  };

  const gotoQuickStartGuide = () => {
    window.location.href = 'https://thegraph.com/docs/quick-start';
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Grid container direction="column">
          <Header onHelp={toggleHelpDialog} />
          <Filter
            orderBy={orderBy}
            withImage={withImage}
            withName={withName}
            onOrderBy={setOrderBy}
            onToggleWithImage={() => setWithImage(!withImage)}
            onToggleWithName={() => setWithName(!withName)}
          />
          <Grid item>
            <Grid container>
              <GravatarsQueryComponent 
                withImage={withImage} 
                withName={withName} 
                orderBy={orderBy} 
              />
            </Grid>
          </Grid>
        </Grid>
        <Dialog
          fullScreen={false}
          open={showHelpDialog}
          onClose={toggleHelpDialog}
          aria-labelledby="help-dialog"
        >
          <DialogTitle id="help-dialog">{'Show Quick Guide?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              We have prepared a quick guide for you to get started with The Graph at
              this hackathon. Shall we take you there now?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleHelpDialog} color="primary">
              Nah, I'm good
            </Button>
            <Button onClick={gotoQuickStartGuide} color="primary" autoFocus>
              Yes, please
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </QueryClientProvider>
  );
}

export default App


      