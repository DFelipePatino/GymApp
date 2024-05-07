import React from 'react'
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './NavBar.css';

// import { makeStyles } from '@mui/styles';


// const useStyles = makeStyles({
//     button: {
//         borderRadius: '60px',
//         backgroundColor: '#e0e0e0',
//     }
// })

function NavBar() {

    // const classes = useStyles();

const ButtonStyle = {
    borderRadius: '20px',
    backgroundColor: '#e0e0e0',
    color: 'black',
    margin: 4,
    padding: 6,
      };



    const navigate = useNavigate();

    const Navs = {

        navprofile: () => {
            navigate("/perfil");
        },

        navworkouts: () => {
            navigate("/workouts");
        },

        navchat: () => {
            navigate("/chat");
        },

        navlogout: () => {
            navigate("/");
        },
    }

    return (
        <Container className='nav'>

            <Stack spacing={1} direction="row" justifyContent="center" margin={4}>

                <Button
                    // className={classes.button}
                    variant="contained"
                    onClick={Navs.navprofile}
                    style={ButtonStyle}
                >
                    Profile
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navworkouts}
                    style={ButtonStyle}
                >
                    Workouts
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navchat}
                    style={ButtonStyle}
                >
                    Chat
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navlogout}
                    style={ButtonStyle}
                >
                    Log Out
                </Button>

            </Stack>

        </Container>
    )
}

export default NavBar