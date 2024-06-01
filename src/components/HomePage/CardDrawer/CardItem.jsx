import * as React from 'react';
import { useDispatch } from 'react-redux';
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
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Divider } from '@mui/material';
import { emptyState } from '../../../redux/actions'
import { useEffect } from 'react';
import { ExpandMore } from '@mui/icons-material';

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

    const timeouts = [];

    const toggleNavigate = async () => {
        toggleDrawer(false)();
        dispatch(emptyState());
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
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, []);

    const category = localStorage.getItem("category");

    return (

        <Card sx={{
            maxWidth: 850,
            // backgroundColor: 'rgb(159, 28, 23)', 
            backgroundColor: 'rgb(146, 144, 144)',
            // backgroundColor: 'rgb(0, 0, 0)',
            // color: 'rgb(146, 144, 144)',
            // color: 'rgb(159, 28, 23)',
            color: 'rgb(0, 0, 0)',
            // fontSize: '1.8rem',
            marginTop: '20px'
        }}>
            <CardHeader
                // avatar={
                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                action={
                    <div>
                        <IconButton aria-label="add to favorites"
                        // onClick={() => navigate('/profile2')}
                        >
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share"
                        // onClick={() => navigate('/profile2')}
                        >
                            <ShareIcon />
                        </IconButton>
                    </div>
                }

                title={`Ejercicios de ${category}`}
                subheader="Quema de grasas"
                subheaderTypographyProps={{
                    style: {
                        // color: 'rgb(146, 144, 144)'
                        color: 'rgb(0, 0, 0)'
                    }
                }}
            />
            <CardMedia
                component="img"
                height="194"
                image="/Screenshot1.png"
                alt="Paella dish"
            />
            <CardContent>
                <Typography
                    variant="body2"
                    // color='rgb(146, 144, 144)'
                    color='rgb(0, 0, 0)'
                >
                    ¡Bienvenidos a nuestro Entrenamiento Completo para Todos los Niveles! Esta rutina de ejercicio de 30 minutos está diseñada para ayudarte a construir fuerza, aumentar la resistencia y mejorar la flexibilidad.
                </Typography>
            </CardContent>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0px' }}>
                <Button variant="contained" style={{
                    // backgroundColor: 'rgb(146, 144, 144)', 
                    backgroundColor: 'rgb(159, 28, 23)',
                    color: 'rgb(146, 144, 144)',
                    fontWeight: 'bold',
                }}
                    onClick={toggleNavigate}
                > En Casa</Button>

                <Button variant="contained" style={{
                    // backgroundColor: 'rgb(146, 144, 144)', 
                    backgroundColor: 'rgb(159, 28, 23)',
                    color: 'rgb(146, 144, 144)',
                    fontWeight: 'bold',
                }}
                    onClick={toggleNavigate}
                > En el Gym</Button>
            </div>


        </Card >
    );
}