import React from 'react';

const UserProfile = ({ profilefoto }) => {

    console.log(profilefoto, 'profilefoto');
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '160px',
                margin: '0 auto',
                marginTop: '120px',
            }}
        >
            <img src={profilefoto} alt="Profile" style={{ width: '96px', height: '96px', borderRadius: '50%' }} />
            <p>Nombre de usuario</p>
        </div>
    );
};

export default UserProfile;