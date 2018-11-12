//  React
import React from 'react';
import Typography from '@material-ui/core/Typography';

const PolicyList = () => (
  <div>
      <Typography variant="h4" gutterBottom component="h2">
        Policies
      </Typography>            
      <Typography>
        Policies represent the permissions associated with a given user/group, resource, and action.
      </Typography>
  </div>
)

export default PolicyList;