import * as React from 'react';
import CardItem from '../CardDrawer/CardItem';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

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

function CardDrawer({ setHeaderLoad, setBannerload, setFilterLoad, showInstructions, usuario, showPlanDeDieta }) {

    [open, setOpen] = React.useState(false);

    return (
        <Root>
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(92% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />

            <SwipeableDrawer

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
                        visibility: 'visible',
                        top: -20,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgb(159, 28, 23)',

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
                        backgroundImage: 'url(/backCardItem.jpg)',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >




                    <CardItem toggleDrawer={toggleDrawer} setHeaderLoad={setHeaderLoad} setBannerload={setBannerload} setFilterLoad={setFilterLoad} showInstructions={showInstructions} usuario={usuario} showPlanDeDieta={showPlanDeDieta} />



                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}


export default CardDrawer;