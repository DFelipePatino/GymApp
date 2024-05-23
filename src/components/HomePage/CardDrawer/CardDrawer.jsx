import * as React from 'react';
import CardItem from '../CardDrawer/CardItem';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Card, CardHeader } from '@mui/material';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

let setOpen;

export const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
};

function SwipeableEdgeDrawer(props) {
    const { window } = props;
    [open, setOpen] = React.useState(false);

    // This is used only for the example
    // const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Root>
            {/* <CssBaseline /> */}
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(90% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            {/* <Box sx={{ textAlign: 'center', pt: 1 }}>

            </Box> */}
            <SwipeableDrawer
                // container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        // borderTopLeftRadius: 8,
                        // borderTopRightRadius: 8,
                        visibility: 'visible',
                        top: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: '#426E92',
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: 'text.secondary' }}></Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >

                    <CardItem />
                    {/* <Skeleton variant="rectangular" height="100%" /> */}
                    {/* <Typography sx={{ p: 2, color: 'text.secondary' }}>Hola</Typography> */}
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

SwipeableEdgeDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SwipeableEdgeDrawer;