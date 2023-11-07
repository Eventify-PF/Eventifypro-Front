"use client";

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs';
import {RxDotFilled} from 'react-icons/rx';
import { fetchEvents } from '@/redux/action/eventActions';

const Carrusel = () => {
    const eventState = useSelector((state) => state.eventReducer);
    const { events } = eventState;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchEvents());
    }, [dispatch])

    const images = events.map((event) => (
      event.image
    ))

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };


    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (imageIndex) => {
        setCurrentIndex(imageIndex);
    }
    
    return (
        <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative'>
            <div style={{backgroundImage:`url(${images[currentIndex]})`}} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
            <h1>Carrusel</h1>
            <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/30 transform transition hover:scale-110'>
                <BsChevronCompactLeft onClick={prevSlide} size={30}/>
            </div>
            <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/30 transform transition hover:scale-110'>
                <BsChevronCompactRight onClick={nextSlide} size={30}/>
            </div>
            <div className='flex top-4 justify-center py-2'>
                {images.map((image, imageIndex) => (
                    <div key={imageIndex} className='text-2xl cursor-pointer transform transition hover:scale-150' onClick={() => goToSlide(imageIndex)}>
                        <RxDotFilled/>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Carrusel;