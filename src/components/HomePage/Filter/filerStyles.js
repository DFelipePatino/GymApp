import { Padding } from "@mui/icons-material"
import { backdropClasses } from "@mui/material"


export const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    position: 'sticky',
    top: "50px",
    backdropFilter: 'blur(2px)',   
    WebkitBackdropFilter: 'blur(2px)',

    // '@media screen and (max-width: 730px) and (max-width: 935px)': {
    //     position: 'sticky',
    //     top: "2px",
    // },

  
        
}

export const navButtonsWrapperProps2 = {
    style: {
        bottom: "0px",
        top: "0px",
        right: "0px",
        transform: "none",
        height: "24%",
        width: "15%",
        position: "relative",
    }
}

export const navButtonsProps2 = {
    style: {
        backgroundColor: 'transparent',
        color: 'black',
    }
}



//Icon Styles

export const iconStyles = {

    /* #426E92 D9D9D9 #9F8A88 */

    iconStyle1: {
        backgroundColor: '#d65757',
        width: '35px',
        height: '35px',
        borderRadius: '20%',
        marginTop: '16px',
        padding: '5px',
        // boxShadow: 'rgba(16, 14, 18, 0.5) 5px 4px 4px',
    },

    iconStyle2: {
        backgroundColor: '#426E92',
        width: '35px',
        height: '35px',
        borderRadius: '20%',
        marginTop: '16px',
        padding: '5px',
        // boxShadow: 'rgba(16, 14, 18, 0.5) 5px 4px 4px',
    },

    iconStyle3: {
        backgroundColor: '#545454',
        width: '35px',
        height: '35px',
        borderRadius: '20%',
        marginTop: '16px',
        padding: '5px',
        // boxShadow: 'rgba(16, 14, 18, 0.5) 5px 4px 4px',
    }
}














//Not in use


export const leftArrowStyles = {
    position: 'absolute',
    top: "50%",
    left: "7%",
    zIndex: "2",
    color: "grey",
    fontSize: "16px",
}

export const rightArrowStyles = {
    position: 'absolute',
    top: "50%",
    right: "7%",
    zIndex: "2",
    color: "grey",
    fontSize: "16px",
}

