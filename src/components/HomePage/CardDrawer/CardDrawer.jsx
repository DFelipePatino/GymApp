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
    backgroundColor: theme.palette.mode === 'light' ? 'rgb(146, 144, 144)' : 'rgb(146, 144, 144)',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

let setOpen;

export const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
};

function CardDrawer({ inOutStatus, setHeaderLoad, setBannerload, setFilterLoad }) {


    [open, setOpen] = React.useState(false);

    return (
        <Root>
            {/* <CssBaseline /> */}
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(92% - ${drawerBleeding}px)`,
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
                        top: -20,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgb(159, 28, 23)',
                        // backgroundColor: 'rgb(146, 144, 144)',
                        // backgroundColor: 'rgba(0, 0, 0)',

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
                        // backgroundColor: 'rgb(159, 28, 23)',
                        // backgroundColor: 'rgba(146, 144, 144)',
                        // backgroundColor: 'rgb(0, 0, 0)',
                        backgroundImage: 'url(public/backCardItem.jpg)',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >

                    <CardItem toggleDrawer={toggleDrawer} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} />

                    {/* <Skeleton variant="rectangular" height="100%" /> */}
                    {/* <Typography sx={{ p: 2, color: 'text.secondary' }}>Hola</Typography> */}
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}


export default CardDrawer;