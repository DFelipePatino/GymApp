import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { toggleDrawer } from '../CardDrawer/CardDrawer';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Divider, Grow } from '@mui/material';
import { emptyState } from '../../../redux/actions'
import { useEffect } from 'react';
import { ExpandMore } from '@mui/icons-material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//     }),
// }));

export default function CardItem({ setHeaderLoad, setBannerload, setFilterLoad }) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const CardIndex = parseInt(localStorage.getItem('CardIndex'), 10) + 1;

    const resultsFiltered = useSelector((state) => state.resultsFiltered);

    const resultsFilteredRutinas = resultsFiltered?.entrenamientos
        ? resultsFiltered.entrenamientos.filter((entrenamiento) => entrenamiento?.id === CardIndex)
        : [];


    const resultsFilteredDia = resultsFilteredRutinas[0]?.dia

    const [expanded, setExpanded] = React.useState(false);

    const [grow, setGrow] = React.useState(true);

    const [showGym, setShowGym] = React.useState(false);
    const [showHome, setShowHome] = React.useState(false);

    const timeouts = [];

    const handleExpandClick = () => {
        setGrow(false);
        setShowGym(true);
        setShowHome(false);
        setTimeout(() => {
            setExpanded(!expanded);
        }, 500);
        setTimeout(() => {
            setGrow(true);
        }, 700);
    };

    const handleExpandClick2 = () => {
        setGrow(false);
        setShowHome(true);
        setShowGym(false);
        setTimeout(() => {
            setExpanded(!expanded);
        }, 500);
        setTimeout(() => {
            setGrow(true);
        }, 700);
    };

    const toggleNavigate = async () => {
        toggleDrawer(false)();
        // dispatch(emptyState());
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            setHeaderLoad(false);
        }, 300);
        setTimeout(() => {
            setBannerload(false);
        }, 300);
        setTimeout(() => {
            setFilterLoad(false);
        }, 400);
        setTimeout(() => {
            (navigate('/player'));
        }, 600);
    }

    useEffect(() => {
        setExpanded(false);
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, []);

    const category = localStorage.getItem("category");

    // const currentMetodo = 

    return (

        <Grow
            in={grow} timeout={500}>

            <Card style={{
                maxWidth: 850,
                color: 'white',
                backgroundColor: 'rgb(0,0,0)',
                // backgroundImage: 'url(/Screenshot1.png)',
                // backgroundColor: 'rgb(0, 0, 0)',
                marginTop: '20px',
                marginBottom: '10px',

            }}>
                {!expanded ? (
                    <>
                        <CardHeader
                            action={
                                <div>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </div>
                            }
                            title={"Dia " + resultsFilteredDia}
                            subheader="En donde vas a entrenar?"
                            subheaderTypographyProps={{
                                style: {
                                    color: 'white'
                                }
                            }}
                        />
                        <CardContent
                            style={{ backgroundColor: 'rgb(0,0,0)', paddingLeft: '0px', paddingRight: '0px' }}
                        >
                            <CardMedia
                                style={{ width: '100%' }}
                                component="img"
                                height="194"
                                image="/Screenshot1.png"
                            />
                        </CardContent>

                        <CardContent>
                            <Typography
                                variant="body2"
                                color='white'
                            >
                                ¡Bienvenidos a nuestro Entrenamiento Completo para Todos! En donde quieres entrenar hoy?
                            </Typography>
                        </CardContent>

                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0px' }}>
                            <Button variant="contained" style={{
                                backgroundColor: 'rgb(159, 28, 23)',
                                // color: 'rgb(146, 144, 144)',
                                // fontWeight: 'bold',
                            }}
                                onClick={handleExpandClick}
                            >En el Gym</Button>

                            <Button variant="contained" style={{
                                backgroundColor: 'rgb(159, 28, 23)',
                                // color: 'rgb(146, 144, 144)',
                                // fontWeight: 'bold',
                            }}
                                onClick={handleExpandClick2}
                            >En Casa</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <CardHeader
                            action={
                                <div
                                    style={{
                                        marginTop: '6px', fontSize: '1rem', padding: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '235px'
                                        // marginLeft: '-40%'
                                    }}
                                >

                                    {resultsFilteredRutinas[0]?.nombre ? resultsFilteredRutinas[0].nombre : null}
                                </div>
                            }

                            title={
                                <div
                                // style={{ marginLeft: '-10px', width: '10px' }}
                                >
                                    <IconButton aria-label="regresar"
                                        style={{
                                            fontSize: '0.8rem',
                                            color: 'rgb(159, 28, 23)'
                                        }}
                                        onClick={() => {
                                            handleExpandClick();
                                        }}
                                    >
                                        <ArrowBackIosNewIcon />
                                        {/* Regresar */}
                                    </IconButton>
                                </div>}
                        />



                        {resultsFilteredRutinas.map((entrenamiento, index) => (
                            <CardContent key={index}
                                style={{ paddingBottom: '0' }}>

                                {entrenamiento.rutinas.map((rutina, index) => (
                                    <div key={index}>
                                        <KeyboardArrowRightIcon
                                            style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
                                        />
                                        <Typography variant="body6" color="white"
                                            style={{ cursor: 'pointer' }}
                                            onClick={toggleNavigate}
                                        >
                                            {rutina.nombre}
                                        </Typography>
                                        <br />
                                    </div>

                                ))}
                            </CardContent>
                        ))}
                        <CardMedia
                            style={{ padding: '10px' }}
                            component="img"
                            height="194"
                            image={"/Screenshot1.png"}
                        />
                    </>
                )}
            </Card>
        </Grow>
    );
}