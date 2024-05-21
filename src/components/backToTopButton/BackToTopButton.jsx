import React from 'react'
import './backToTopButton.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function BackToTopButton() {
    return (
        <div>
            <KeyboardArrowUpIcon
                className='backToTop'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <p className='backToTop2'>Top</p>
        </div>
    )
}

export default BackToTopButton