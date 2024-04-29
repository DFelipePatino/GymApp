import React from 'react';
import Cards from '../cards/cards'
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCardio, getPesas, getPilates } from '../../redux/actions';
import { useSelector } from 'react-redux';
import './HomePage.css';

function HomePage() {

    const results = useSelector((state) => state.results);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const navprofile = () => {
        navigate("/perfil");
    }

    const navworkouts = () => {
        navigate("/workouts");
    }

    const navchat = () => {
        navigate("/chat");
    }

    const navlogout = () => {
        navigate("/");
    }


    const loadCardio = () => {
        dispatch(getCardio());
        console.log(results);
    }

    const loadPesas = () => {
        dispatch(getPesas());
        console.log(results);
    }

    const loadPilates = () => {
        dispatch(getPilates());
        console.log(results);
    }

    const items = [
        {
            image: "banner1.jpg",
            link: "/profile"
            // name: "Random Name #1",
            // description: "Probably the most random thing you have ever seen!"
        },
        {
            image: "banner2.jpg",
            // name: "Random Name #2",
            // description: "Hello World!"
        },
        {
            image: "banner3.jpg",
            // name: "Random Name #3",
            // description: "Hello World!"
        }
    ];

    const user = 'David';

    function Item(props) {
        return (
            <Paper className="paper">
                <Link to={props.item.link}>
                    <img src={props.item.image} alt={props.item.name} />
                </Link>
                {/* <h2>{props.item.name}</h2>
                <p>{props.item.description}</p> */}
            </Paper>
        );
    }

    return (
        <div className="home">

            <section className='welcome'>
                <h1>Bienvenido {user}</h1>
            </section>


            <section className='background'>
                <img src="onegym2_edited.jpeg" alt="background" />
            </section>

            <section className='nav'>
                <ul>
                    <li onClick={navprofile} > Profile
                    </li>
                    <br />
                    <li onClick={navworkouts} > Workouts
                    </li>
                    <br />
                    <li onClick={navchat} >Chat
                    </li>
                    <br />
                    <li onClick={navlogout} >Log Out
                    </li>
                </ul>
            </section>

            <section className="banner">
                <Carousel className="carousel"
                    navButtonsAlwaysVisible={true}
                    navButtonsAlwaysInvisible={false}
                    animation="slide"
                    navButtonsProps={{          // Change the order of the buttons
                        style: {
                            backgroundColor: 'transparent',
                            color: 'black'
                        }
                    }}
                    navButtonsWrapperProps={{
                        style: {
                            bottom: '0',
                            top: '0',
                            transform: 'none',
                            height: '100%'
                        }
                    }}
                >
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
            </section >

            <section className='filter'>
                <ul>
                    <li onClick={loadPilates} className='pilates'>
                        <img src="pilates.png" alt="pilates" />
                        <div>Pilates</div>
                    </li>
                    <br />
                    <li onClick={loadPesas} className='pesas'>
                        <img src="pesas2.png" alt="pesas" />
                        <div>Pesas</div>
                    </li>
                    <br />
                    <li onClick={loadCardio} className='cardio'>
                        <img src="cardio.png" alt="cardio" />
                        <div >Cardio</div>
                    </li>
                </ul>
            </section>


            <Cards className="cards" />



        </div>
    );
}

export default HomePage;