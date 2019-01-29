import React from 'react';
import {
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading,
  Image,
  Layout,
  Link,
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
  psycho: require('images/psycho.gif'),
  redux: require('images/redux.gif'),
  graphql: require('images/graphql.gif'),
  reduxLogo: require('images/redux-logo.svg'),
  graphqlLogo: require('images/graphql-logo.svg'),
  easy: require('images/easy.gif'),
  hard: require('images/hard.gif'),
  mls: require('images/mls.png'),
  apollo: require('images/apollo.svg'),
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
  mutation: require('code/mutation.example'),
  mutationComponent: require('code/mutation-component.example'),
  pagination: require('code/pagination.example'),
  cache: require('code/cache.example'),
  localState: require('code/local-state.example'),
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
        fontSize: '1.5em',
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
        <ListItem>Плавная миграция с Redux на GraphQL</ListItem>
        <ListItem margin="15px 0 0 0">Внедрение GraphQL в приложение клинеров</ListItem>
      </List>
    </Slide>
    <Slide bgColor="primary">
      <Heading size={3} textColor="secondary" margin="0 0 50px 0">
        MLS Case Study
      </Heading>
      <Image src={images.mls} width={1000} margin="0 0 30px"/>
      <Link
        href="https://blog.apollographql.com/reducing-our-redux-code-with-react-apollo-5091b9de9c2a"
        textColor="secondary"
        target="_blank"
      >
        Статья на Medium
      </Link>
      <Notes>
        У MLS была задача создать динамический UI, который часто обновлялся.
        Воспользовашись API React Apollo они установили требуемым запросам интервал в 60 секунд.
        Количество кода уменьшилось более чем в 4 раза, места для багов стало меньше.
      </Notes>
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
        Эти расчеты наиболее правильно применять в относительном соотношении
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
      <Heading size={4} textColor="secondary" margin="0 0 20px 0">
        Решение других задач в минутах
      </Heading>
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

          В приложении, имеющим 50 запросов к серверу каждая из этих вещей
          может усредненно может присутствовать в 20 экземеплярах
          Ещё 45 часов в пользу GraphQL на приложение и 90 часов на два приложения
        </Notes>
      </Table>
    </Slide>
    <Slide bgColor="primary">
      <Heading fit textColor="quaternary" margin="0 0 50px">
        Обмен данными с сервером в цифрах
      </Heading>
      <Heading size={4} textColor="secondary" margin="0 0 50px">
        Redux ~ 149 часов без дебага
      </Heading>
      <Heading size={4} textColor="secondary" margin="0 0 150px">
        GraphQL ~ 24 часа без дебага
      </Heading>
      <Text textSize={25} textColor="tertiary">
        Выборка составлена по приложениям Qlean для клинеров и клиентов
      </Text>
      <Notes>
        К сожалению невозможно посчитать время, которые мы тратим на дебаг.
        Однажды с неработающим линтером в HRM я порядка 3 часов искал ошибку в коде,
        оказалось запятая прилипла к номерам линий в редакторе.
        Про непойманные ошибки в промисах вообще отдельный разговор, да и про JS в целом
      </Notes>
    </Slide>

    <Slide bgColor="primary">
      <Heading fit textColor="secondary" margin="0 0 50px 0">
        Уменьшение связанности сервера и клиента
      </Heading>
      <Notes>
        Что сказать
      </Notes>
    </Slide>

    <Slide bgColor="primary">
      <Heading fit textColor="secondary" margin="0 0 50px">
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
        Запрос к серверу с помощью Redux
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
        <ListItem>Нормализация данных</ListItem>
      </List>
      <Notes>
        После запроса нам в некоторых случаях надо до 5 запросов сделать, чтобы обновить другой UI
        Ошибки нужно обрабатывать уже в саге, форматировать и только за тем передавать в компонент
        Пагинация в Redux делается вручуную, приходится заводить локальный стейт под неё
        Кеширование коллекций работает, но вот сущностей нет
        Данные нужно нормализовать описывая схемы нормализации, чтобы ими можно было пользоваться
      </Notes>
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
      <Notes>
        Все работает очень просто, описываем данные запроса и сразу работаем с ними уже в компоненте
      </Notes>
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

    <Slide bgColor="primary">
      <Image src={images.apollo} width={1000}/>
    </Slide>
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="0 0 20px">Пагинация</Heading>
      <CodePane
        lang="jsx"
        source={codeSamples.pagination}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        В Apollo Client есть реализация из коробки курсорной и оффсетной пагинации.
        Все что нам нужно - это описать каким образом мержить данные дополнительных запросов
      </Notes>
    </Slide>
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="0 0 20px 0">Инвалидация</Heading>
      <CodePane
        lang="js"
        source={codeSamples.mutation}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        Допустим мы отправили какие-то данные на сервер и нужно перезапросить несколько коллекций
        В Redux мы делаем для этого дополнительные запросы к серверу (есть кейсы, когда их 5-6)
        В GraphQL мы просто описываем данные, которые хотим обновить с ответа на мутацию
      </Notes>
    </Slide>
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="0 0 20px">Оптимистичный UI</Heading>
      <CodePane
        lang="jsx"
        source={codeSamples.mutationComponent}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        Хороший UX - когда пользователю не приходится ждать ответа сервера.
        Если пользователь обновил данные используя мобильный интеренет,
        нам приходится сигнализировать ему крутилкой ожидание ответа сервера.
        Мы можем оптимистично отреагировать на его запрос и обновить UI моментально.
        В случаях, когда сервер лежит мы можем сообщить об этом пользователю
        и попросить повторить свой запрос
      </Notes>
    </Slide>
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="0 0 20px">Кеширование</Heading>
      <CodePane
        lang="jsx"
        source={codeSamples.cache}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        Чтобы кешировать сущность нам просто нужно описать её резолвинг по id
      </Notes>
    </Slide>
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="0 0 20px">Локальное состояние</Heading>
      <CodePane
        lang="jsx"
        source={codeSamples.localState}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        Мы любим Redux за то,
        что он является единым источником правды и хранит все состояние приложения.
        Apollo Client позволяет нам делать ровно тоже самое, только без описания редьюсеров.
      </Notes>
    </Slide>
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="-30px 0 30px">Серверная валидация</Heading>
      <iframe
        src="https://codesandbox.io/embed/o151702ppz?autoresize=1&fontsize=20&eslint=1&view=editor"
        style={{
          width: '1200px',
          height: '600px',
          border: '0',
          borderRadius: '4px',
          overflow: 'hidden',
          marginLeft: '-100px',
        }}
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
    </Slide>

    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary">
        Плавная миграция с Redux на GraphQL
      </Heading>
    </Slide>

    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary">
        Внедрение GraphQL в клинерское приложение
      </Heading>
      <Notes>Стоит 80 часов - окупится через полгода при 10 задачах с серверными реквестами</Notes>
    </Slide>

    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary" caps>
        Q & A
      </Heading>
    </Slide>

    <Slide bgColor="tertiary">
      <BlockQuote>
        <Quote textColor="secondary">Example Quote</Quote>
        <Cite margin="10px 0 0 30px" textColor="primary">Author</Cite>
      </BlockQuote>
    </Slide>
    <Slide>
      <Heading size={4} textColor="secondary" margin="0 0 30px">Become a psycho using GIF</Heading>
      <Image src={images.psycho} width={900}/>
      <Notes>gifs work too</Notes>
    </Slide>
  </Deck>
);

export default Presentation;
