import ISFRobotics from './Projects/ISFRobotics';
import ISFEdc from './Projects/ISFEdc';
import ISFHumani from './Projects/ISFHumani';
import ISFSmile from './Projects/ISFSmile';
import ISFCovid from './Projects/ISFCovid';
import React, { forwardRef } from 'react';


const Article = forwardRef((props, ref) => {
    return (
        <div ref={ref}>
            <ISFRobotics/>
            <ISFEdc />
            <ISFHumani/>
            <ISFSmile/>
            <ISFCovid/>


        </div>




    );
});

export default Article


//Navbar smaller, waterproject 
//