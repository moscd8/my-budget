import React from 'react';
// import styled from 

import Slider from 'react-slick';
import classes from './SlideView.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//speed=500 : 0.5 milis

const SlideView = (props) => {
    var settings = {
       // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return (
        <div className={classes.Wrapper}> 
            
            <Slider {...settings} >
                {props.children}

            </Slider> 
        </div>
    )
} 
export default SlideView;