import { gql } from '@apollo/client';
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import * as React from 'react';

const styles = () => {
    return createStyles({
        root: {
          
        }
    });  
}

interface CredibilityProps extends WithStyles<typeof styles>{

}

function Credibility({classes }: CredibilityProps){
    return (
        <div>
            
        </div>
    );
}


export default withStyles(styles)(Credibility);  