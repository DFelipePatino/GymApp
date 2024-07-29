import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from "react";
// import { getMetodo1, setMetodoID, addFav } from '../../../redux/actions';
import { fetchBlobWithAuth } from '../../multimediaUtils';


const Image = (imgProps) => {

    const [image, setImage] = useState([]);

    async function getImageObject(idImg, imgWidth) {
        try {
            // console.log(idImg, 'idImg')
            const blob = await fetchBlobWithAuth(`/multimedia/image/${idImg}`);
            const objectURL = URL.createObjectURL(blob);
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
