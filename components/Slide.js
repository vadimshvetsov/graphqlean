import React from 'react';
import { Slide as SpectacleSlide, Image } from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';

import logo from 'images/qlean-logo.svg';

preloader(logo);

const logoStyle = {
  position: 'absolute',
  left: '30px',
  top: '30px',
};

const Slide = ({ children, isWithLogo = true, ...rest }) => (
  <SpectacleSlide {...rest}>
    {isWithLogo && <Image src={logo} style={logoStyle}/>}
    {children}
  </SpectacleSlide>
);

export default Slide;
