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
    const [expanded, setExpanded] = React.useState(false);

    const toggleNavigate = async () => {
        toggleDrawer(false)();
        dispatch(emptyState());
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            setHeaderLoad(false);
        }, 200);
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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const category = localStorage.getItem("category");

    return (
        <Card sx={{ maxWidth: 850, backgroundColor: '#9e4d4d', color: 'white', marginTop: '40px' }}>
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
                subheaderTypographyProps={{ style: { color: 'white' } }}
            />
            <CardMedia
                component="img"
                height="194"
                image="/Screenshot1.png"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="white">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat.
                </Typography>
            </CardContent>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '0px' }}>
                <Button variant="contained" style={{ backgroundColor: 'lightblue', color: 'black' }}

                    // onClick={toggleDrawer(false)}

                    // onClick={() => {

                    //     setTimeout(() => {
                    //         navigate('/player');
                    //     }, 500);
                    // }}

                    // onClick={() => { navigate('/player') }}

                    onClick={toggleNavigate}

                // onClick={toggleDrawer(false);
                //     setTimeout(() => {
                //                 navigate('/player');
                //             }, 2000);
                // }


                // onClick={() => {
                //     toggleDrawer(false).then(navigate('/player'));
                // }}

                > En Casa</Button>

                <Button variant="contained" style={{ backgroundColor: '#f0c14b', color: 'black' }}
                    onClick={() => navigate('/player')}
                > En el Gym</Button>
            </div>

            {/* <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
            {/* <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore> */}
            {/* </CardActions> */}
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                        aside for 10 minutes.
                    </Typography>
                    <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                        medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                        occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo in the pan. Add
                        pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                        stirring often until thickened and fragrant, about 10 minutes. Add
                        saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with artichokes and
                        peppers, and cook without stirring, until most of the liquid is absorbed,
                        15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                        mussels, tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just tender, 5 to 7
                        minutes more. (Discard any mussels that don&apos;t open.)
                    </Typography>
                    <Typography>
                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                </CardContent>
            </Collapse> */}
        </Card >
    );
}