import React from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@material-ui/core';
import './Profile2.css';


function Profile2({ name, dob, age, email, profilePicture, goals, healthStatus }) {
    return (
        <Card
            style={{
                backgroundImage: 'linear-gradient(to bottom right, #924141, #924141, #d9d9d9)',
                height: '100%',
                color: 'white',
            }}>
            <CardHeader
                style={{ color: 'white' }}
                avatar={
                    <Avatar
                        alt={name} src={profilePicture} />
                }
                title={name}
                subheader={`Email: ${email}`}
                subheaderTypographyProps={{ color: 'white' }}
            />
            <CardContent>
                <Typography
                    style={{ color: 'white' }} variant="body2" component="p">
                    DOB: {dob}
                </Typography>
                <Typography style={{ color: 'white' }} variant="body2" component="p">
                    Age: {age}
                </Typography>
                <Typography style={{ color: 'white' }} variant="body2" component="p">
                    Goals: {goals}
                </Typography>
                <Typography style={{ color: 'white' }} variant="body2" component="p">
                    Health Status: {healthStatus}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Profile2;