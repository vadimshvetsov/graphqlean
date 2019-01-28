import React from 'react';
import {
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading,
  Image,
  List,
  ListItem,
  Notes,
  Quote,
  Text,
} from 'spectacle';
import preloader from 'spectacle/lib/utils/preloader';
import createTheme from 'spectacle/lib/themes/default';
import { colors } from '@qlean/york-core';
import 'normalize.css';

import Slide from 'components/Slide';
import CodeSlide from 'components/CodeSlide';

import 'styles/fonts.css';
import 'styles/dracula-prism.css';

const images = {
  santa: require('images/santa.png'),
  psycho: require('images/psycho.gif'),
};

const codeSamples = {
  deck: require('code/deck.example'),
};

preloader(images);

const theme = createTheme({
  primary: colors.black,
  secondary: colors.green,
  tertiary: colors.white,
  quaternary: colors.red,
  dracula: 'rgba(40, 41, 54, 1)',
}, {
  primary: 'MuseoSans',
  tertiary: 'PT Mono',
});

const customTheme = {
  ...theme,
  screen: {
    ...theme.screen,
    components: {
      ...theme.screen.components,
      syntax: {
        ...theme.screen.components.syntax,
        fontSize: '2em',
      },
    },
  },
};

const Presentation = () => (
  <Deck
    transition={['fade']}
    transitionDuration={500}
    theme={customTheme}
    bgColor="primary"
    controls={false}
    showFullscreenControl={false}
  >
    <Slide bgColor="primary" isWithLogo={false}>
      <Heading size={1} fit lineHeight={1} textColor="secondary">
            Qlean Spectacle Boilerplate
      </Heading>
      <Text margin="10px 0 0" textColor="tertiary" fit bold>
            open the presentation/index.js file to get started
      </Text>
    </Slide>
    <Slide bgColor="tertiary">
      <Heading size={6} textColor="quaternary" caps>
            Typography
      </Heading>
      <Heading size={1} textColor="primary">
            Heading 1
      </Heading>
      <Heading size={2} textColor="primary">
            Heading 2
      </Heading>
      <Heading size={3} textColor="primary">
            Heading 3
      </Heading>
      <Heading size={4} textColor="primary">
            Heading 4
      </Heading>
      <Heading size={5} textColor="primary">
            Heading 5
      </Heading>
      <Text size={6} textColor="primary">
            Standard text
      </Text>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading size={6} textColor="secondary" caps>
            Standard List
      </Heading>
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
        <ListItem>Item 4</ListItem>
      </List>
    </Slide>
    <Slide bgColor="primary">
      <Heading size={2} textColor="secondary" margin="0 0 30px 0">Custom Image</Heading>
      <Image src={images.santa} width={800}/>
    </Slide>
    <Slide bgColor="tertiary">
      <BlockQuote>
        <Quote textColor="secondary">Example Quote</Quote>
        <Cite margin="10px 0 0 30px" textColor="primary">Author</Cite>
      </BlockQuote>
    </Slide>
    <Slide>
      <Heading size={4} textColor="secondary" margin="0 0 30px 0">Become a psycho using GIF</Heading>
      <Image src={images.psycho} width={900}/>
      <Notes>gifs work too</Notes>
    </Slide>
    <Slide>
      <Heading size={5} textColor="secondary" margin="0 0 30px 0">Code Sample</Heading>
      <CodePane
        lang="jsx"
        source={codeSamples.deck}
        theme="external"
      />
    </Slide>
    <CodeSlide
      lang="jsx"
      code={codeSamples.deck}
      ranges={[
        { loc: [0, 1], title: 'Use down arrow' },
        { loc: [2, 3], note: 'Explain your code' },
        { loc: [3, 4], note: 'Go deeper' },
        { loc: [4, 7] },
        { loc: [7, 11] },
      ]}
    />
  </Deck>
);

export default Presentation;
