import React from 'react';
import './WAButton.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function WAButton() {
    return (
        <div>
            <WhatsAppIcon
                className='backToTop'
                onClick={() => {
                    const whatsappUrl = 'https://api.whatsapp.com/send/?phone=%2B573107709118&text=Hola+David%2C+soy+usuario+One&type=phone_number&app_absent=0';
                    const anchor = document.createElement('a');
                    anchor.href = whatsappUrl;
                    anchor.target = '_blank';
                    anchor.click();
                }}
            />
            {/* <p className='backToTop2'>Top</p> */}
        </div>
    );
}

export default WAButton;