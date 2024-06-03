import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getMetodo1 } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// const icon = (
//     <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
//         <p>hello</p>
//     </Paper>
// );

export default function SimpleGrow() {

    const dispatch = useDispatch();

    const results = useSelector((state) => state.results);
    console.log(results, "this are the results");

    const [checked, setChecked] = React.useState(false);

    // const handleChange = () => {
    //     setChecked((prev) => !prev);
    // };



    useEffect(() => {
        if (Object.keys(results).length !== 0) {
            setChecked(true);
        }
        else {
            setChecked(false);
        }
    }, [results]);


    return (
        // <Box sx={{ height: 180, margin: '70px', backgroundColor: 'white' }}>
        //     <FormControlLabel
        //         control={<Switch checked={checked} onChange={handleChange} />}
        //         label="Show"
        //     />
        // </Box>

        <Box sx={{ display: 'flex', backgroundColor: 'white', margin: '70px' }}>
            <Button onClick={() => { dispatch(getMetodo1()) }}>Click</Button>
            <FormControlLabel
                control={<Switch checked={checked}
                // onChange={handleChange} 
                />}
                label="Show"
            />
            {/* <Grow in={checked}>{icon}</Grow> */}
            {/* Conditionally applies the timeout prop to change the entry speed. */}
            <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 1000 } : {})}
            >
                <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
                    <p>hello</p>
                </Paper>
            </Grow>
        </Box>
    );
}