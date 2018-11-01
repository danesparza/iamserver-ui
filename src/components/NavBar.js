import React, { Component } from 'react';
import { Pane, Button, Heading } from 'evergreen-ui'

class NavBar extends Component {
  
    render() {
      return (        
        <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
            <Pane flex={1} alignItems="center" display="flex">
                <Heading size={600}>IAM Server</Heading>
            </Pane>
            <Pane>
                <Button>Sign out</Button>
            </Pane>
        </Pane>
      );
    }
  
}
  
export default NavBar;