import React from 'react'
import './backToTopButton.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function BackToTopButton() {
    return (
        <div>
            <KeyboardDoubleArrowUpIcon
                className='backToTop'
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            {/* <p className='backToTop2'>Top</p> */}
        </div>
    )
}

export default BackToTopButton