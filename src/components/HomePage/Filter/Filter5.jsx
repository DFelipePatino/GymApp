// import React, { forwardRef, useRef, useImperativeHandle } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getMetodo1, setMetodoID } from '../../../redux/actions';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Carousel from 'react-material-ui-carousel';
// import { navButtonsWrapperProps2, navButtonsProps2 } from './filterStyles';

// const Filter5 = forwardRef(({ setInOutStatus1, setInOutStatus2, setInOutStatus3, setInOutStatus4, setInOutStatus5 }, ref) => {
//     const localRef = useRef(null);
//     const dispatch = useDispatch();
//     const results = useSelector((state) => state.results);

//     const handleClick = (id) => {
//         localStorage.setItem("category", "Tu Seleccion")
//         // const metodoIndex = index;
//         const idToFind = id;
//         // dispatch(setMetodoID(metodoIndex));
//         dispatch(getMetodo1(idToFind));

//         setInOutStatus1(false);
//         setInOutStatus2(false);
//         setInOutStatus3(false);
//         setInOutStatus4(false);
//         setInOutStatus5(false);

//         setTimeout(() => {
//             setInOutStatus5(true);
//         }, 500);

//         setTimeout(() => {
//             if (localRef.current) {
//                 localRef.current.scrollIntoView({ behavior: 'smooth' });
//                 const yCoordinate = localRef.current.getBoundingClientRect().top + window.pageYOffset;
//                 window.scrollTo({ top: yCoordinate - 80, behavior: 'smooth' });
//             }
//         }, 600);

//     };

//     useImperativeHandle(ref, () => ({
//         scrollToComponent: handleClick,
//     }));


//     const items = results?.data?.map((item, index) => ({
//         icon: <img src={'public/DavidB&W.png'} alt="David" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />,
//         // click: loadFns.loadM1,
//         // name: item.nombre || 'Loading',
//         id: item.id,
//     })) || [{
//         // click: loadFns.loadM1(0),
//         name: 'Loading',
//         id: 1,
//     }];

//     const chunkedItems = items.reduce((resultArray, item, index) => {
//         const chunkIndex = Math.floor(index / 3);
//         if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
//         resultArray[chunkIndex].push(item);
//         return resultArray;
//     }, []);

//     const Item = (props) => (
//         <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '100%', width: '100%', padding: '0px' }}>
//             {props.items.map((item, index) => (
//                 <Button
//                     key={index}
//                     style={{ width: '200px', height: '170px', padding: '0px', margin: '5px', color: 'white' }}
//                     color='error'
//                     onClick={() => {
//                         handleClick(item.id);
//                     }}
//                 >
//                     <p>{item.name}</p>
//                     <div>{item.icon}</div>
//                 </Button>
//             ))}
//         </div>
//     );

//     return (
//         <Container ref={localRef}>
//             <Carousel
//                 navButtonsAlwaysVisible={true}
//                 animation="slide"
//                 autoPlay={true}
//                 stopAutoPlayOnHover={true}
//                 interval={6000}
//                 cycleNavigation={true}
//                 indicators={false}
//                 navButtonsProps={navButtonsProps2}
//                 navButtonsWrapperProps={navButtonsWrapperProps2}
//             >
//                 {chunkedItems.map((itemGroup, i) => <Item key={i} items={itemGroup} />)}
//             </Carousel>
//         </Container>
//     );
// });

// export default Filter5;
