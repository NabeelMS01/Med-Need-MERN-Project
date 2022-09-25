import { Grid, Typography } from '@mui/material'
import React from 'react'

function About({children}) {
  return (
    <>
     <Grid>
              <Typography variant="body2">
               {children}
              </Typography>
            </Grid>
            </>
  )
}

export default About