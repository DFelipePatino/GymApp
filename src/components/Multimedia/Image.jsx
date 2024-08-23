import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
// import { getMetodo1, setMetodoID, addFav } from '../../../redux/actions';
import { fetchBlobWithAuth } from '../../multimediaUtils';
import { baseUrl } from "../../redux/actions";


const Image = (imgProps) => {

    const [image, setImage] = useState([]);

    async function getImageObject(idImg, imgWidth) {
        try {
            const id_token = localStorage.getItem('id_token');
            const objectURL = `${baseUrl}/multimedia/image/${idImg}?token=${id_token}`;
            return <img className="img-thumbnail multimedia-item" src={objectURL} alt="Multimedia item" style={{ width: imgWidth }} />;
        } catch (error) {
            console.error('Error fetching image:', error);
            return <img className="img-thumbnail multimedia-item" alt="Multimedia item" style={{ width: imgWidth }} />;
        }
    }

    const getImage = async () => {
        const image = await getImageObject(imgProps?.id ? imgProps.id : 1, imgProps?.width ? imgProps.width : '60%');
        setImage(image);
    };

    useEffect(() => {
        getImage();
    }, []);

    // console.log(image, 'image');

    return (
        <>
            {image}
        </>
    )

}

export default Image;
