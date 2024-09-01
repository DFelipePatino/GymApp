import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './contentPlayer.css';
import { Button, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Fade, Grid, Grow, IconButton, LinearProgress, Typography, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReactPlayer from 'react-player'
import { Box } from '@mui/system';
import { ExpandMore, FavoriteBorder, Gradient } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { fetchBlobWithAuth } from '../../../../multimediaUtils';
import { actualizarEntrenamiento, getProgresoActual, getEntrenamiento } from '../../../../redux/actions';
import Swal from 'sweetalert2';
import { styled } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import PlaylistAddCheckCircleOutlinedIcon from '@mui/icons-material/PlaylistAddCheckCircleOutlined';
import Tooltip from '@mui/material/Tooltip';
import { baseUrl } from '../../../../redux/actions';

const CssTextField = styled(TextField)({
    '& label': {
        color: 'rgb(146, 144, 144)',
    },
    '& label.Mui-focused': {
        color: 'rgb(159, 28, 23)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(159, 28, 23)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(159, 28, 23)',
        },
        '& input': { // Add this block to change the value color
            color: 'rgb(159, 28, 23)',
        },
    },
});


function ContentPlayerCE({ setPlayerLoad, playerLoad, setReload, usuario, cardioState, WAButton }) {

    const location = useLocation();
    const navigate = useNavigate();

    const [fadeLoad, setfadeLoad] = useState(true);
    const [urlVideo, setUrlVideo] = useState('');
    const [expanded, setExpanded] = React.useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [cardio, setCardio] = useState(location.state.cardioEstiramiento);

    const homeContent = localStorage.getItem("homeContent");

    useEffect(async () => {

        getVideoLink(cardio);
        let fadeLoadTimeout = setTimeout(() => {
            setfadeLoad(false);
        }, 900);
        let playerLoadTimeout = setTimeout(() => {
            setPlayerLoad(true);
        }, 350);

        window.scrollTo(0, 0);

        return () => {
            clearTimeout(fadeLoadTimeout);
            clearTimeout(playerLoadTimeout);
        };
    }, [navigate, homeContent]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expanded === false) {
            window.scrollTo({ top: 150, behavior: 'smooth' });
        }
        else if (expanded === true) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const getVideoLink = async (item) => {

        const idVideo = item?.multimedia?.find(i => i.type === 'VIDEO')?.id || null;

        if (!idVideo) {
            setUrlVideo('https://www.youtube.com/watch?v=9bZkp7q19f0');
            return;
        }

        const id_token = localStorage.getItem('id_token');
        setUrlVideo(`${baseUrl}/multimedia/video/${idVideo}?token=${id_token}`);
    };


    return (
        <div className="contenthome">
            <Fade in={fadeLoad} timeout={600}>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </Fade>

            <Grow
                in={playerLoad}
                style={{ transformOrigin: '1 1 1' }}
                {...(playerLoad ? { timeout: 800 } : {})}
            >
                <div className='mediaPlayer'>
                    <Card
                        style={{ width: '94%', height: 'auto', backgroundColor: 'rgb(0, 0, 0)', radius: '1px, solid, rgb(159, 28, 23)' }}
                    >
                        <CardHeader
                            action={
                                <div
                                    style={{
                                        marginTop: '12px',
                                        fontSize: '1rem',
                                        padding: '4px',
                                        paddingLeft: '0px',
                                        paddingBottom: '0px',
                                        color: 'white',
                                        whiteSpace: 'normal' // This ensures text wraps to the next line
                                    }}
                                >
                                    {cardio?.nombre || "Cargando..."}
                                </div>
                            }
                            title={
                                <div>
                                    <IconButton aria-label="regresar"
                                        style={{
                                            fontSize: '0.8rem',
                                            color: 'rgb(159, 28, 23)',
                                            paddingRight: '0px'
                                        }}
                                        onClick={() => {
                                            localStorage.setItem("homeContent", "goBack");
                                            setPlayerLoad(false);
                                            setTimeout(() => {
                                                navigate("/home");
                                            }, 200);
                                        }}
                                    >
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                </div>
                            }
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px 0px',
                                paddingRight: '30%',
                            }}
                        />
                        {urlVideo === '' ?

                            <div style={{
                                width: '100%',
                                height: '350px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)'
                            }}>
                                <LinearProgress />
                            </div>

                            :
                            <ReactPlayer
                                //  ref={playerRef}
                                url={urlVideo}
                                controls={true}
                                width={'100%'}
                                height={'350px'}
                                playing={isPlaying}
                                light={!isPlaying && <img style={{ height: "100%", width: "auto" }} src='/videoPreview.jpeg' alt='Thumbnail' />}
                                style={{ background: 'linear-gradient(to bottom, rgb(0, 0, 0),rgb(159, 28, 23),rgb(0, 0, 0)' }}
                            />

                        }

                        <CardActions
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexWrap: 'wrap',
                                flexDirection: 'column',
                                alignContent: 'flex-start',
                                alignItems: 'flex-start',
                            }}
                        >


                            <div
                                style={{ display: 'flex', width: '100%' }}
                            >
                                <br />

                                <ExpandMore
                                    expand={expanded ? 'true' : undefined}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                    sx={{ ml: '50px', mt: '5px', color: 'rgb(159, 28, 23)', pointer: 'cursor' }}
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                                <Typography
                                    sx={{ color: 'rgb(159, 28, 23)', fontSize: '0.8rem', marginTop: '25px', marginLeft: '-35px', pointer: 'cursor' }}
                                    onClick={handleExpandClick}
                                >
                                    Expandir
                                </Typography>

                            </div>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph
                                    style={{ color: 'white' }}
                                >{cardio?.nombre}
                                </Typography>

                                <Typography
                                    style={{ color: 'white' }}
                                    paragraph>
                                    Descripcion:
                                    <br />
                                    {cardio?.descripcion}
                                </Typography>

                            </CardContent>
                        </Collapse>
                    </Card>
                </div>
            </Grow >
            <WAButton />
        </div >
    );
}

export default ContentPlayerCE;
