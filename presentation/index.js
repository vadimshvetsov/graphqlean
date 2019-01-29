import React from 'react';
import {
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading,
  Image,
  Layout,
  List,
  ListItem,
  Notes,
  Quote,
  Table,
  TableHeaderItem,
  TableItem,
  TableRow,
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
  redux: require('images/redux.gif'),
  graphql: require('images/graphql.gif'),
  reduxLogo: require('images/redux-logo.svg'),
  graphqlLogo: require('images/graphql-logo.svg'),
  easy: require('images/easy.gif'),
  hard: require('images/hard.gif'),
};

const codeSamples = {
  deck: require('code/deck.example'),
  reducer: require('code/reducer.example'),
  saga: require('code/saga.example'),
  fork: require('code/fork.example'),
  shape: require('code/shape.example'),
  component: require('code/component.example'),
  query: require('code/query.example'),
  queryComponent: require('code/query-component.example'),
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
  secondary: 'Rubik',
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
    showFullWidthControl={false}
  >
    <Slide bgColor="primary" isWithLogo={false}>
      <Heading size={1} fit textColor="secondary">
        GraphQLean
      </Heading>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading size={4} textColor="secondary" caps>
        Что будем обсуждать
      </Heading>
      <List>
        <ListItem>Сравнение стоимости разработки решений</ListItem>
        <ListItem margin="15px 0">Уменьшение связанности сервера и клиента</ListItem>
        <ListItem>Боли взаимодействия Redux с сервером</ListItem>
        <ListItem margin="15px 0">Решения GraphQL</ListItem>
        <ListItem>Внедрение GraphQL в приложение клинеров</ListItem>
        <ListItem margin="15px 0 0 0">Плавная миграция с Redux на GraphQL</ListItem>
      </List>
    </Slide>
    <Slide bgColor="primary">
      <Heading fit textColor="secondary" margin="0 0 50px 0">
        Сравнение стоимости разработки решений
      </Heading>
      <Notes>
        Я не претендендую на абсолютную точность расчётов.
        Для подсчета средних значений временных затрат я пользовался выборкой из 20 задач
        с запросами к серверу, которые мне приходилось решать в разных проектах Qlean.
        Не все задачи подразумевали решение сложных проблем, выборка по ним меньше.
      </Notes>
    </Slide>
    <Slide>
      <Text textColor="secondary" margin="0 0 20px" textSize={40}>
        Получение данных запроса с Redux - 27 минут
      </Text>
      <Image src={images.hard} width={400}/>
      <Text textColor="secondary" margin="20px 0 20px" textSize={40}>
        Получение данных запроса с GraphQL - 6 минут
      </Text>
      <Image src={images.easy} width={400}/>
      <Notes>44 запроса в клинерском приложении, 58 в клиентском, 36 часов в пользу GraphQL</Notes>
    </Slide>
    <Slide>
      <Heading size={4} textColor="secondary" margin="0 0 20px 0">Решение задач в минутах</Heading>
      <Table style={{ borderSpacing: '0 20px', color: colors.white }}>
        <TableRow style={{ color: colors.red }}>
          <TableHeaderItem>Задача</TableHeaderItem>
          <TableHeaderItem>Redux</TableHeaderItem>
          <TableHeaderItem>GraphQL</TableHeaderItem>
        </TableRow>
        <TableRow>
          <TableItem>Пагинация</TableItem>
          <TableItem>60</TableItem>
          <TableItem>5</TableItem>
        </TableRow>
        <TableRow>
          <TableItem>Валидация</TableItem>
          <TableItem>20</TableItem>
          <TableItem>5</TableItem>
        </TableRow>
        <TableRow>
          <TableItem>Инвалидация</TableItem>
          <TableItem>30</TableItem>
          <TableItem>3</TableItem>
        </TableRow>
        <TableRow>
          <TableItem>Кеширование</TableItem>
          <TableItem>20</TableItem>
          <TableItem>2</TableItem>
        </TableRow>
        <TableRow>
          <TableItem>Сихронизация</TableItem>
          <TableItem>15</TableItem>
          <TableItem>0</TableItem>
        </TableRow>
        <TableRow>
          <TableItem>Оптимистичный UI</TableItem>
          <TableItem>10</TableItem>
          <TableItem>5</TableItem>
        </TableRow>
        <TableRow style={{ color: colors.red }}>
          <TableItem>Итого</TableItem>
          <TableItem>155</TableItem>
          <TableItem>20</TableItem>
        </TableRow>
        <Notes>
          Курсорная и оффсетная пагинация из коробки
          Валидация описывается в схеме и достается прямо в компоненте
          Можно описать политику кеширования и инвалидации запроса
          Кеширование любой сущности при условии описании резолва
          Во время мутации мы просим сервер вернуть другие зависимые коллекции для синхронизации
          Оптимистичный апдейт описывается декларативно
        </Notes>
      </Table>
    </Slide>
    <Slide bgColor="primary">
      <Heading fit textColor="secondary" margin="0 0 50px 0">
        Боли взаимодействия Redux с сервером
      </Heading>
      <Image src={images.reduxLogo} width={400}/>
    </Slide>
    <Slide bgColor="tertiary">
      <Heading size={2} textColor="secondary">Как работает Redux</Heading>
      <Image src={images.redux} width={700}/>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary" caps>
        Redux Boilerplate для запроса к серверу
      </Heading>
      <List ordered>
        <ListItem>Создать селектор и константу</ListItem>
        <ListItem margin="25px 0">Создать экшн, воркер и вотчера саги</ListItem>
        <ListItem>Зарегистрировать вотчера</ListItem>
        <ListItem margin="25px 0">Типизировать формат данных</ListItem>
        <ListItem>Прокинуть и вызвать экшн в компоненте</ListItem>
        <ListItem margin="25px 0">Передать и проверить данные в компоненте</ListItem>
        <ListItem>Вызвать метод после получения данных</ListItem>
      </List>
    </Slide>
    <CodeSlide
      lang="js"
      code={codeSamples.reducer}
      textSize={25}
      ranges={[
        { loc: [0, 0], title: 'Создаем константу и селектор' },
        { loc: [4, 8] },
        { loc: [9, 13] },
        { loc: [14, 19], note: 'Estimation: 2 min' },
      ]}
    />
    <CodeSlide
      lang="js"
      code={codeSamples.saga}
      textSize={23}
      ranges={[
        { loc: [0, 0], title: 'Создаем экшн, воркер и вотчер' },
        { loc: [5, 6] },
        { loc: [16, 19] },
        { loc: [7, 15], note: 'Estimation: 4 min' },
      ]}
    />
    <CodeSlide
      lang="js"
      code={codeSamples.fork}
      textSize={23}
      ranges={[
        { loc: [0, 9], note: 'Estimation: 1 min', title: 'Регистрируем вотчер' },
      ]}
    />
    <CodeSlide
      lang="js"
      code={codeSamples.shape}
      textSize={23}
      ranges={[
        { loc: [0, 0], title: 'Типизируем данные' },
        { loc: [14, 31], note: 'Estimation: 5 min' },
      ]}
    />
    <CodeSlide
      lang="jsx"
      code={codeSamples.component}
      textSize={23}
      ranges={[
        { loc: [0, 0], title: 'Вызываем экшн в компоненте' },
        { loc: [5, 6] },
        { loc: [61, 66] },
        { loc: [18, 19] },
        { loc: [21, 24], note: 'Estimation: 3 min' },
      ]}
    />
    <CodeSlide
      lang="jsx"
      code={codeSamples.component}
      textSize={23}
      ranges={[
        { loc: [0, 0], title: 'Проверяем данные в компоненте' },
        { loc: [4, 5] },
        { loc: [57, 60] },
        { loc: [65, 66] },
        { loc: [6, 7] },
        { loc: [15, 18] },
        { loc: [40, 55], note: 'Estimation: 10 min' },
      ]}
    />
    <CodeSlide
      lang="jsx"
      code={codeSamples.component}
      textSize={23}
      ranges={[
        { loc: [0, 0], title: 'Вызываем метод после получения данных' },
        { loc: [25, 35], note: 'Estimation: 2 min' },
      ]}
    />
    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary" caps>Сложные случаи</Heading>
      <List>
        <ListItem>Реакция на изменения в других компонентах</ListItem>
        <ListItem margin="25px 0">Серверная валидация форм</ListItem>
        <ListItem>Пагинация</ListItem>
        <ListItem margin="25px 0">Кеширование</ListItem>
        <ListItem>Нормализация данных и ошибок</ListItem>
      </List>
    </Slide>
    <Slide bgColor="primary">
      <Layout>
        <Image src={images.graphqlLogo} width={1000}/>
        <Text textColor="#E10098" textFont="secondary" textSize={180}>GraphQL</Text>
      </Layout>
    </Slide>
    <Slide bgColor="#e6e8ec">
      <Heading size={4} textColor="secondary" margin="0 0 50px">Как работает GraphQL</Heading>
      <Image src={images.graphql} width={500}/>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary" caps>
        Запрос к серверу с помощью GraphQL
      </Heading>
      <List ordered>
        <ListItem>Описать данные в запроса</ListItem>
        <ListItem margin="25px 0">Обработать данные в компоненте</ListItem>
      </List>
    </Slide>
    <CodeSlide
      lang="js"
      code={codeSamples.query}
      textSize={24}
      ranges={[
        { loc: [0, 0], title: 'Описываем данные запроса' },
        { loc: [2, 22], note: 'Estimation: 2 min' },
      ]}
    />
    <CodeSlide
      lang="jsx"
      code={codeSamples.queryComponent}
      textSize={24}
      ranges={[
        { loc: [0, 0], title: 'Обрабатываем данные в компоненте' },
        { loc: [1, 2] },
        { loc: [3, 4] },
        { loc: [12, 22], note: 'Estimation: 4 min' },
      ]}
    />

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
  </Deck>
);

export default Presentation;
