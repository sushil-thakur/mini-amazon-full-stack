import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react'

const Test = () => {
    const [count, setCount] = useState(1);
    const [count2, setCount2] = useState(100);
    


//? use effect
//?handle side effects in your components
//react components  life cycle: mount, update, unmount
//? syntax
//use effect (function)
//use effect (function, [dependencies])//dependencies is an array of variables that the effect depends on
//use effect (function, [a,b,c])//run once when the component mounts


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