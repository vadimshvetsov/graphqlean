import React from 'react';
import SpectacleCodeSlide from 'spectacle-code-slide';

const CodeSlide = ({ showLineNumbers = false, lang = 'js', ...rest }) => (
  <SpectacleCodeSlide
    lang={lang}
    showLineNumbers={showLineNumbers}
    bgColor="dracula"
    color="#ccc"
    {...rest}
  />
);

export default CodeSlide;
