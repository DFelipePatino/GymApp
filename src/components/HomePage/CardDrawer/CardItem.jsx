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

    const resultsFiltered = useSelector((state) => state.resultsFiltered);
    // console.log(resultsFiltered, 'resultsFiltered en cardItem');


    // console.log(resultsFiltered.entrenamientos, 'entrenamientos en cardItem');

    // const dia = resultsFiltered.entrenamientos

    const [expanded, setExpanded] = React.useState(false);

    const [grow, setGrow] = React.useState(true);

    const timeouts = [];

    const handleExpandClick = () => {
        setGrow(false);
        //dispatch de contenido en 2view
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
                color: 'rgb(0, 0, 0)',
                backgroundColor: 'rgb(146, 144, 144)',
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
                            title={category}
                            subheader="Quema de grasas"
                            subheaderTypographyProps={{
                                style: {
                                    color: 'rgb(0, 0, 0)'
                                }
                            }}
                        />
                        <CardContent
                            style={{ backgroundColor: 'rgb(0, 0, 0)', paddingLeft: '0px', paddingRight: '0px' }}
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
                                color='rgb(0, 0, 0)'
                            >
                                ¡Bienvenidos a nuestro Entrenamiento Completo para Todos los Niveles! Esta rutina de ejercicio de 30 minutos está diseñada para ayudarte a construir fuerza, aumentar la resistencia y mejorar la flexibilidad.
                            </Typography>
                        </CardContent>

                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0px' }}>
                            <Button variant="contained" style={{
                                backgroundColor: 'rgb(159, 28, 23)',
                                color: 'rgb(146, 144, 144)',
                                fontWeight: 'bold',
                            }}
                                onClick={handleExpandClick}
                            >En el Gym</Button>

                            <Button variant="contained" style={{
                                backgroundColor: 'rgb(159, 28, 23)',
                                color: 'rgb(146, 144, 144)',
                                fontWeight: 'bold',
                            }}
                                onClick={handleExpandClick}
                            >En Casa</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <CardHeader
                            action={
                                <div
                                    style={{ marginTop: '6px', fontSize: '1.5rem', padding: '4px', display: 'flex', justifyContent: 'center', paddingRight: '110%' }}
                                >
                                    {/* {`Entrenamientos de ${category}`} */}
                                    Entrenamientos
                                </div>
                            }

                            title={
                                <div
                                    style={{ marginLeft: '-10px' }}
                                >
                                    <IconButton aria-label="regresar"
                                        style={{
                                            fontSize: '0.8rem',
                                            // color: 'rgb(159, 28, 23)'
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



                        {resultsFiltered.entrenamientos && resultsFiltered.entrenamientos.map((entrenamiento, index) => (
                            <CardContent key={index}
                                style={{ paddingBottom: '0' }}>

                                {entrenamiento.rutinas.map((rutina, index) => (
                                    <div key={index}>
                                        <KeyboardArrowRightIcon
                                            style={{ color: 'rgb(156, 28, 23)', cursor: 'pointer' }}
                                        />
                                        <Typography variant="body6" color="text.secondary"
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