import { Button, Card, Divider, Fade, FormControl, FormControlLabel, FormLabel, LinearProgress, Radio, RadioGroup, Slide, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardDrawer from "../HomePage/CardDrawer/CardDrawer";
import { toggleDrawer } from "../HomePage/CardDrawer/CardDrawer";
import { infoCardsIconStyle, cardHeaderStyle, buttonStyle } from "../Perfil/Profile2";
import ListAltIcon from '@mui/icons-material/ListAlt';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import '../Perfil/Profile2.css';
import WAButton from "../WAButton/WAButton";

const Payment = ({ headerMountIn, setHeaderMountIn }) => {

    const [fadeLoad, setfadeLoad] = useState(true)
    const [activeButton, setActiveButton] = useState("");
    const [showInstructions, setShowInstructions] = useState(false);
    const [showPlanDeDieta, setShowPlanDeDieta] = useState(false);
    const [planLength, setPlanLength] = useState(false);
    const [showLink, setShowLink] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [displayLink, setDisplayLink] = useState(false);
    //this has to be passed as a prop from the parent component

    useEffect(() => {
        setTimeout(() => {
            setHeaderMountIn(true);
        }, 1000);
    }, []);

    const planLengthAnimation = () => {
        setDisplayLink(false);
        setTimeout(() => {
            setDisplayLink(true);
        }, 800);
    };


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        planLengthAnimation();
    };


    const handlePlanChange = (button) => {
        planLengthAnimation();
        setPlanLength(true);
        setTimeout(() => {
            setActiveButton(button);
            window.scroll({ top: 200, behavior: 'smooth' });
        }, 800);
    };

    const handleClickInstructivo = () => {
        setShowPlanDeDieta(false);
        setShowInstructions(true);
        toggleDrawer(true)();
    }



    const getLinkDetails = (buttonType, linkDuration) => {
        const links = {
            Premium: {
                3: "https://checkout.bold.co/payment/LNK_RQR0AJZR11",
                6: "https://checkout.bold.co/payment/LNK_CAQS6CWBIF",
                12: "https://checkout.bold.co/payment/LNK_ZYU6G0PEA3",
            },
            Basic: {
                1: "https://checkout.bold.co/payment/LNK_TRZQRYD07V",
                6: "https://checkout.bold.co/payment/LNK_U3DQ8U24CM",
                12: "https://checkout.bold.co/payment/LNK_JF0U1E5QXP",
            },
        };

        const descriptions = {
            Premium: {
                3: "Premium de 3 meses",
                6: "Premium de 6 meses",
                12: "Premium de 12 meses",
            },
            Basic: {
                1: "Básico de 1 mes",
                6: "Básico de 6 meses",
                12: "Básico de 12 meses",
            },
        };

        return { url: links[buttonType][linkDuration], description: descriptions[buttonType][linkDuration] };
    };

    const renderLink = () => {
        if (activeButton === "Premium" || activeButton === "Basic") {
            const { url, description } = getLinkDetails(activeButton, showLink);
            if (url) {
                return (
                    <Fade in={displayLink} timeout={400}>
                        <div className="link">
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                {description} <ArrowOutwardIcon />
                            </a>
                            <p>Click para ir a pagar</p>
                        </div>
                    </Fade>
                );
            }
        }
        return (
            <div className="noLink">
                <Typography >Aquí verás tu link de pago</Typography>
            </div>
        );
    };

    return (

        <div className='profile2div'>

            <div
                className='container1'
            >
                <Slide
                    direction="right"
                    in={headerMountIn}
                    timeout={500}
                    mountOnEnter unmountOnExit>


                    <div className='container2'>

                        <>
                            <div
                                className='lastDiv'
                            >

                                <div className="topText">
                                    <Typography>Adquire tu plan!</Typography>
                                    <br />
                               
                                </div>

                                <Card style={infoCardsIconStyle}>
                                    {/* <PictureAsPdfTwoToneIcon /> */}
                                    <ListAltIcon />
                                    {/* <Link to={userForTesting.DietPlan} target='blank'> */}
                                    <Button
                                        style={{ color: 'white' }}
                                        onClick={() => {
                                            handleClickInstructivo();
                                        }}
                                    >
                                        Instructivo
                                    </Button>
                                    {/* </Link> */}
                                </Card>

                            </div>

                            <Divider
                                sx={{
                                    weight: '1px',
                                    height: '0.5px',
                                    backgroundColor: 'rgb(159, 28, 23)',
                                }} />

                            <br />


                            <FormLabel id="form-control"
                                sx={{ color: 'white', display: 'flex', justifyContent: 'center' }}
                            >Selecciona tu tipo de plan:
                            </FormLabel>

                            <div className='contact'
                            >
                                <Button
                                    style={{
                                        fontSize: '16px',
                                        paddingTop: '8px',
                                        paddingBottom: '10px',
                                        borderRadius: '40px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: activeButton === 'Premium' ? 'rgb(159, 28, 23)' : 'rgb(146, 144, 144)',
                                        color: 'white'
                                    }}
                                    onClick={() => handlePlanChange('Premium')}
                                    variant='contained'
                                >
                                    {/* <ArrowBackIosNewIcon /> */}
                                    Premium
                                </Button>

                                <Button
                                    style={{
                                        fontSize: '16px',
                                        paddingTop: '8px',
                                        paddingBottom: '10px',
                                        borderRadius: '40px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: activeButton === 'Basic' ? 'rgb(159, 28, 23)' : 'rgb(146, 144, 144)',
                                        color: 'white'
                                    }}
                                    onClick={() => handlePlanChange('Basic')}
                                    variant='contained'
                                >
                                    {/* <ArrowBackIosNewIcon /> */}
                                    Basico
                                </Button>


                            </div>

                            <br />
                            <Divider
                                sx={{
                                    weight: '1px',
                                    height: '0.5px',
                                    backgroundColor: 'rgb(159, 28, 23)',
                                }} />

                            {activeButton !== "" ? (


                                <div
                                    className='lastDiv'
                                >
                                    <Fade in={planLength} timeout={800}>

                                        <FormControl>
                                            <FormLabel id="form-control"
                                                sx={{ color: 'white' }}
                                            >Selecciona la duracion {<br />} del plan {activeButton}:
                                            </FormLabel>
                                            <br />

                                            <RadioGroup
                                                row
                                                aria-labelledby="form-control"
                                                name="position"
                                                defaultValue="3"
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    flexWrap: 'nowrap'
                                                }}
                                            >
                                                {activeButton === 'Basic' ? (
                                                    <FormControlLabel
                                                        value="1"
                                                        control={<Radio
                                                            onClick={() =>
                                                                setTimeout(() => {
                                                                    setShowLink(1)
                                                                }, 600)}

                                                            sx={{
                                                                color: "rgb(256, 256, 256)",
                                                                '&.Mui-checked': {
                                                                    color: "rgb(159, 28, 23)",
                                                                },
                                                            }}
                                                        />}
                                                        label="1"
                                                        labelPlacement="top"
                                                        checked={selectedValue === '1'}
                                                        onChange={handleChange}
                                                    />
                                                ) : null}

                                                {activeButton === 'Premium' ? (
                                                    <FormControlLabel
                                                        value="3"
                                                        control={<Radio
                                                            onClick={() =>
                                                                setTimeout(() => {
                                                                    setShowLink(3)
                                                                }, 600)}
                                                            sx={{
                                                                color: "rgb(256, 256, 256)",
                                                                '&.Mui-checked': {
                                                                    color: "rgb(159, 28, 23)",
                                                                },
                                                            }}
                                                        />}
                                                        label="3"
                                                        labelPlacement="top"
                                                        checked={selectedValue === '3'}
                                                        onChange={handleChange}
                                                    />
                                                ) : null}

                                                <FormControlLabel
                                                    value="6"
                                                    control={<Radio
                                                        onClick={() =>
                                                            setTimeout(() => {
                                                                setShowLink(6)
                                                            }, 600)}
                                                        sx={{
                                                            color: "rgb(256, 256, 256)",
                                                            '&.Mui-checked': {
                                                                color: "rgb(159, 28, 23)",
                                                            },
                                                        }}
                                                    />}
                                                    label="6"
                                                    labelPlacement="top"
                                                    checked={selectedValue === '6'}
                                                    onChange={handleChange}
                                                />
                                                <FormControlLabel
                                                    value="12"
                                                    control={<Radio
                                                        onClick={() =>
                                                            setTimeout(() => {
                                                                setShowLink(12)
                                                            }, 600)}
                                                        sx={{
                                                            color: "rgb(256, 256, 256)",
                                                            '&.Mui-checked': {
                                                                color: "rgb(159, 28, 23)",
                                                            },
                                                        }}
                                                    />}
                                                    label="12"
                                                    labelPlacement="top"
                                                    checked={selectedValue === '12'}
                                                    onChange={handleChange}
                                                />

                                            </RadioGroup>
                                        </FormControl>

                                    </Fade>
                                </div >

                            ) :
                                <br />

                            }

                            {renderLink()}

                            <br />
                        </>

                    </div>

                </Slide >
            </div >
            <CardDrawer showInstructions={showInstructions} />
            <WAButton />
        </div >

    );
}

export default Payment;