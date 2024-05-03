import React from 'react'
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './NavBar.css';

function NavBar() {

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
        <Container style={{
            display: 'flex', justifyContent: 'center', margin: 0,
            padding: 0
        }} className='nav'>
            <Stack spacing={1} direction="row" justifyContent="center" margin={4}>

                <Button
                    variant="contained"
                    onClick={Navs.navprofile}
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#D9D9D9',
                        color: 'black',
                        margin: 4,
                        padding: 4
                    }}>
                    Profile
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navworkouts}
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#D9D9D9',
                        color: 'black',
                        margin: 4,
                        padding: 4
                    }}>
                    Workouts
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navchat}
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#D9D9D9',
                        color: 'black',
                        margin: 4,
                        padding: 4
                    }}>
                    Chat
                </Button>

                <Button
                    variant="contained"
                    onClick={Navs.navlogout}
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#D9D9D9',
                        color: 'black',
                        margin: 4,
                        padding: 4
                    }}>
                    Log Out
                </Button>

            </Stack>
        </Container>
    )
}

export default NavBar