import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react'

const Test = () => {
    const [count, setCount] = useState(1);
  return (
    <Box>
        <Typography variant='h1'>{count}</Typography>
        <Button
        variant='contained'
        onClick={() => {
            let newCount = count + 1;
            setCount(newCount);
        }}
        >
            increase count
            </Button>
            </Box>

    


  )
}

export default Test