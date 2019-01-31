import React from 'react';
import {
  Appear,
  CodePane,
  Deck,
  Heading,
  Image,
  Layout,
  Link,
  List,
  ListItem,
  Notes,
  Table,
  TableHeaderItem,
  TableItem,
  TableRow,
  Text,
  S,
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
  graphiql: require('images/graphiql.gif'),
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
  graphqlRedux: require('code/graphql-redux.example'),
  lifecycle: require('code/lifecycle.example'),
  graphqlSaga: require('code/graphql-saga.example'),
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
        <Appear>
          <ListItem>Сравнение времени разработки решений</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="15px 0">Уменьшение связанности сервера и клиента</ListItem>
        </Appear>
        <Appear>
          <ListItem>Боли взаимодействия Redux с сервером</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="15px 0">Решения GraphQL</ListItem>
        </Appear>
        <Appear>
          <ListItem>Плавная миграция с Redux на GraphQL</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="15px 0">Внедрение GraphQL в приложение клинеров</ListItem>
        </Appear>
      </List>
      <Notes>
        Сегодня я хочу рассказать о нескольких своих наблюдениях,
        которые помогут принять нам решение - нужна ли нам миграция на GraphQL и какая от неё выгода
        <br/>
        <br/>
        Для начала мы сравним стоимость взаимодействия с сервером на Redux и GraphQL
        <br/>
        <br/>
        Мы часто теряем много времени на коммуникации и в целом на взаимодействии бэкенда
        с фронтендом. GraphQL поможет нам уменьшить связанность
        <br/>
        <br/>
        Далее будет погружение в то, как мы используем Redux для взаимодействия с сервером.
        Я расскажу на что мы тратим время сейчас.
        <br/>
        <br/>
        Затем мы обсудим как GraphQL может нам помочь сделать тоже самое в 4 раза быстрее
        <br/>
        <br/>
        После того, как мы обсудим преимущества GraphQL мы затронем тему возможности плавной
        миграции на GraphQL
        <br/>
        <br/>
        В самом конце я оценю стоимость миграции клинерского приложения на GraphQL на фронтенде
        и предположу срок окупаемости этого решения
      </Notes>
    </Slide>
    <Slide bgColor="primary">
      <Heading size={3} textColor="secondary" margin="0 0 50px">
        MLS Case Study
      </Heading>
      <Image src={images.mls} width={1000} margin="0 0 30px"/>
      <Link
        href="https://blog.apollographql.com/reducing-our-redux-code-with-react-apollo-5091b9de9c2a"
        textColor="secondary"
        target="_blank"
      >
        <S type="underline">Статья на Medium</S>
      </Link>
      <Notes>
        Кейс MLS (сайт футбольной лиги США).
        Хотели динамический UI, который часто обновлялся.
        Благодаря React Apollo они установили требуемым запросам интервал в 60 секунд.
        Количество кода меньше более чем в 4 раза, места для багов стало меньше.
        Ниже ссылка на статью про опыт миграции
      </Notes>
    </Slide>

    <Slide bgColor="primary">
      <Heading fit textColor="secondary" margin="0 0 50px">
        Сравнение стоимости разработки решений
      </Heading>
      <Notes>
        Я не претендендую на абсолютную точность расчётов.
        Для подсчета средних значений временных затрат я:
        <br/>
        - анализировал кодовую базу клинерского приложения
        <br/>
        - пользовался выборкой из 20 задач с запросами к серверу
        которые мне довелось решать в разных проектах Qlean.
        <br/>
        Не все задачи подразумевали решение сложных проблем.
        Эти расчеты наиболее правильно применять в относительном соотношении,
        например на GraphQL в среднем всё в 4 раза быстрее получается сделать
      </Notes>
    </Slide>
    <Slide>
      <Text textColor="secondary" margin="0 0 20px" textSize={40}>
        Получение данных запроса с Redux - 40 минут
      </Text>
      <Image src={images.hard} width={400}/>
      <Text textColor="secondary" margin="20px 0 20px" textSize={40}>
        Получение данных запроса с GraphQL - 10 минут
      </Text>
      <Image src={images.easy} width={400}/>
      <Notes>
        30 GET и 14 POST запросов в клинерском приложении.
        Обработка POST запроса в среднем занимает в полтора раза больше времени.
      </Notes>
    </Slide>
    <Slide>
      <Heading size={4} textColor="secondary" margin="0 0 20px">
        Решение других задач
      </Heading>
      <Table style={{ borderSpacing: '0 20px', color: colors.white }}>
        <TableRow style={{ color: colors.red }}>
          <TableHeaderItem>Задача</TableHeaderItem>
          <TableHeaderItem>Redux</TableHeaderItem>
          <TableHeaderItem>GraphQL</TableHeaderItem>
        </TableRow>
        <Appear>
          <TableRow>
            <TableItem>Пагинация</TableItem>
            <TableItem>60 м</TableItem>
            <TableItem>10 м</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Валидация</TableItem>
            <TableItem>30 м</TableItem>
            <TableItem>10 м</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Инвалидация</TableItem>
            <TableItem>20 м</TableItem>
            <TableItem>5 м</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Кеширование</TableItem>
            <TableItem>N/A</TableItem>
            <TableItem>2 м</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Оптимистичный UI</TableItem>
            <TableItem>N/A</TableItem>
            <TableItem>5 м</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow style={{ color: colors.red }}>
            <TableItem>Итого</TableItem>
            <TableItem>110 м</TableItem>
            <TableItem>32 м</TableItem>
          </TableRow>
        </Appear>
        <Notes>
          В Redux мы делаем пагинации руками, механизма нет. Императивно описываем алгоритм.
          На бэке один человек делал пагинацию в одном стиле, другой делал в другом.
          Курсорная и оффсетная пагинация из коробки в GraphQL.
          <br/>
          <br/>
          В Redux мы трансформируем ошибки в данные, что часто занимает много времени.
          В GraphQL ошибки валидации описываются в схеме и достаются прямо
          в компоненте в удобном формате.
          <br/>
          <br/>
          Инвалидация это о двух вещах.
          В сагах нам приходится руками запрашивать данные после запроса,
          перед этим проверяя на ошибки предыдущий.
          В компонентах нужно проверять есть данные или нет руками, чтобы делать второй запрос.
          В GraphQL можно описать политику кеширования и инвалидации запроса,
          есть 5 разных вариантов.
          Для инвалидации других коллекций в мутациях указываем что обновить.
          <br/>
          <br/>
          С нашей архитектурой кеширование сложно реализовать.
          В GraphQL кеширование любой сущности легко достижимо при условии описании её резолва.
          <br/>
          <br/>
          Оптимистичный апдейт описывается декларативно, c Redux это может достигаться костылями,
          например эмитирование преждевременного ответа сервера или полный игнор ответа сервера.
        </Notes>
      </Table>
      <Text textSize={20} textColor="tertiary" margin="20px 0">
        Расчеты основаны на анализе 20 задач с логикой обработки данных с сервера
      </Text>
    </Slide>

    <Slide bgColor="primary">
      <Heading fit textColor="secondary" margin="0 0 50px 0">
        Уменьшение связанности сервера и клиента
      </Heading>
      <Notes>
        Любая задача сально завязана на коммуникации фронтендера с бэкендером.
        <br/>
        Новый эндпоинт даже для существуещих моделей.
        <br/>
        У нас есть много эндпоинтов на запрос одной и той же коллекции.
      </Notes>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading size={2} textColor="secondary">Бэкенд</Heading>
      <List>
        <Appear>
          <ListItem>Схема и типизация сущностей на бэкенде</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Не нужно версионирование</ListItem>
        </Appear>
        <Appear>
          <ListItem>Проверка на обратную совместимость в CI</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Не нужен контроллер, только модель</ListItem>
        </Appear>
        <Appear>
          <ListItem>Расширение условий фильтрации коллекций</ListItem>
        </Appear>
      </List>
      <Notes>
        В JS много проблем с числами и отсутствует напрочь типизация. Но мы типизируем на бэке.
        <br/>
        <br/>
        Можно версионировать схему и регулировать контекстом нужную для запроса версию,
        но это в самых крайних случаях, потому что GraphQL поощряет развитие схемы в новые типы.
        <br/>
        <br/>
        Можно валидировать схему в CI на обратную совместимость,
        расширять API новыми коллекциями, депрекейтить старые прямо в схеме.
        Нам не придется коммуницировать про устаревшие коллекции,
        потому что фронт получит ворнинг при запросе.
        <br/>
        <br/>
        Нужно описывать модели и резолверы для коллекций и полей.
        <br/>
        <br/>
        Можно добавлять различные условия фильтрации, чтобы фронт сам решал как и когда фильтровать.
      </Notes>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading size={2} textColor="secondary">Фронтенд</Heading>
      <List>
        <Appear>
          <ListItem>Инкапсуляция согласования данных в схему</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Нет необходимости написания PropTypes</ListItem>
        </Appear>
        <Appear>
          <ListItem>Вложенные связи без написания бэкенда</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Следование спецификации GraphQL</ListItem>
        </Appear>
      </List>
      <Notes>
        После определения схемы данных коммуникация необязательна.
        <br/>
        <br/>
        Вероятности что мы получим что-то не соответствующее схеме нет.
        <br/>
        <br/>
        Можем сами фильтровать коллекции под кейс, описывать вложенность и реляционные данные.
        Часто задачи будут решаться только на фронте, когда раньше понадобился бы ещё и бэкенд.
        У нас есть запрос Settings, который запрашивает все данные нужные для загрузки приложения.
        Этого можно было бы избежать, если бы мы использовали GraphQL.
        Из-за отсутствия возможности кешировать сущности,
        мы позже все те же данные запрашиваем уже по доменам.
        <br/>
        <br/>
        Благодаря наличию спецификации GraphQL фронтенд не зависит от имплементации на бэкенде.
      </Notes>
    </Slide>
    <Slide bgColor="primary">
      <Heading size={4} textColor="secondary" margin="0 0 50px">
        GraphiQL
      </Heading>
      <Image src={images.graphiql} width={1000}/>
      <Notes>
        Документация генерируется автоматически из схемы.
        Не придется описывать API схемы в Swagger или аналогах.
        Интерфейс GraphiQL доступен всегда и позволяет исследовать схему целиком.
        При надобности можно добавлять типам description и это будет отобращаться.
        Этим интерфейсом может пользоваться любой член команды.
        Тестировщики всегда смогут точно установить - на бэке или фронте баг.
        Они просто могут повторить GraphQL запрос фронта скопировав из пулл реквеста.
      </Notes>
    </Slide>

    <Slide bgColor="primary">
      <Heading fit textColor="secondary" margin="0 0 50px">
        Боли взаимодействия Redux с сервером
      </Heading>
      <Image src={images.reduxLogo} width={400}/>
      <Notes>
        Теперь немного погрузимся в Redux и как мы с ним работаем
      </Notes>
    </Slide>
    <Slide bgColor="tertiary">
      <Heading size={3} textColor="secondary" margin="0 0 50px">Как работает Redux</Heading>
      <Image src={images.redux} width={700}/>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary" caps>
        Запрос к серверу с помощью Redux
      </Heading>
      <List ordered>
        <Appear>
          <ListItem>Создать селектор и константу</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Создать экшн, воркер и вотчер саги</ListItem>
        </Appear>
        <Appear>
          <ListItem>Зарегистрировать вотчер</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Прокинуть и вызвать экшн в компоненте</ListItem>
        </Appear>
        <Appear>
          <ListItem>Типизировать формат данных</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Передать и проверить данные в компоненте</ListItem>
        </Appear>
      </List>
      <Notes>
        Часто придется думать о нейминге как во время написания кода, так и на ревью.
      </Notes>
    </Slide>
    <CodeSlide
      lang="js"
      code={codeSamples.reducer}
      textSize={25}
      ranges={[
        { loc: [0, 0], title: 'Создаем константу и селектор' },
        { loc: [4, 8] },
        { loc: [9, 13] },
        { loc: [14, 19], note: 'Estimation: 4 min' },
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
        { loc: [7, 15], note: 'Estimation: 5 min' },
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
      lang="jsx"
      code={codeSamples.component}
      textSize={23}
      ranges={[
        { loc: [0, 0], title: 'Вызываем экшн в компоненте' },
        { loc: [5, 6] },
        { loc: [61, 66] },
        { loc: [18, 19] },
        { loc: [21, 24], note: 'Estimation: 5 min' },
      ]}
    />
    <CodeSlide
      lang="js"
      code={codeSamples.shape}
      textSize={23}
      ranges={[
        { loc: [0, 0], title: 'Типизируем данные' },
        { loc: [14, 31], note: 'Estimation: 10 min' },
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
        { loc: [40, 55], note: 'Estimation: 15 min' },
      ]}
    />
    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary" caps>Сложные случаи</Heading>
      <List>
        <Appear>
          <ListItem>Пагинация</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Инвалидация коллекций после изменений</ListItem>
        </Appear>
        <Appear>
          <ListItem>Серверная валидация запроса</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Кеширование и нормализация</ListItem>
        </Appear>
        <Appear>
          <ListItem>Оптимистичная реакция на действие</ListItem>
        </Appear>
      </List>
      <Notes>
        Пагинация в Redux делается вручуную, приходится заводить локальный стейт под неё
        <br/>
        <br/>
        После запроса нам в некоторых случаях надо до 5 запросов сделать, чтобы обновить другой UI
        <br/>
        <br/>
        Ошибки нужно обрабатывать уже в саге, форматировать и только за тем передавать в компонент
        <br/>
        <br/>
        Кеширование коллекций работает, но вот сущностей нет
        Данные нужно нормализовать описывая схемы нормализации, чтобы как-то кешировать их
        <br/>
        <br/>
        Оптимистичный UI практически не используем, потому что в текущей архитектуре это костыли
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
        <Appear>
          <ListItem>Описать данные запроса</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0 0">Обработать данные в компоненте</ListItem>
        </Appear>
      </List>
    </Slide>
    <CodeSlide
      lang="js"
      code={codeSamples.query}
      textSize={24}
      ranges={[
        { loc: [0, 0], title: 'Описываем данные запроса' },
        { loc: [2, 22], note: 'Estimation: 5 min' },
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
        { loc: [12, 22], note: 'Estimation: 5 min' },
      ]}
    />

    <Slide bgColor="primary">
      <Image src={images.apollo} width={1000}/>
      <Notes>
        Преимущества Apollo для решения более сложных задач
      </Notes>
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
      <Heading size={4} textColor="secondary" margin="0 0 20px">Инвалидация</Heading>
      <CodePane
        lang="js"
        source={codeSamples.mutation}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        Допустим мы отправили какие-то данные на сервер и нужно перезапросить несколько коллекций.
        <br/>
        В Redux мы делаем для этого дополнительные запросы к серверу (есть кейсы, когда их 5-6).
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
        Чтобы кешировать сущность нам просто нужно описать её резолвинг по id.
        <br/>
        Благодаря возможности определить поведение запроса, мы можем сначала брать данные из кеша,
        затем делать запрос на бэк. Можем делать запрос каждый раз, может только использовать кеш.
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
        Мы просто можем записать данные в кеш.
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
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="0 0 20px">Компоненты</Heading>
      <CodePane
        lang="jsx"
        source={codeSamples.graphqlRedux}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        Apollo Client позволяет нам получать данные из компонентов,
        поэтому нам не важен роутинг, другие состояния и redux в целом.
        Мы можем добавить Apollo в любое приложение и сразу использовать.
      </Notes>
    </Slide>
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="0 0 20px">Жизненный цикл компонента</Heading>
      <CodePane
        lang="jsx"
        source={codeSamples.lifecycle}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        Иногда нам данные нужны в методах lifecycle.
        Чем хорош API Render Props - тем что он может быть и HOC при надобности.
        А вот HOC не может стать компонентом с API Render Props.
      </Notes>
    </Slide>
    <Slide bgColor="dracula">
      <Heading size={4} textColor="secondary" margin="0 0 20px">Saga</Heading>
      <CodePane
        lang="jsx"
        source={codeSamples.graphqlSaga}
        theme="external"
        style={{ display: 'flex', justifyContent: 'center' }}
      />
      <Notes>
        Сейчас у нас вся логика обращений на сервер имплементирована в сагах.
        Можно запрашивать данные прямо в них с GraphQL эндпоинта.
      </Notes>
    </Slide>

    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary">
        Внедрение GraphQL в клинерское приложение
      </Heading>
      <Notes>
        Время миграции моделей на бэке я посчитать не могу,
        но клинерское API достаточно легко поддается этой миграции
      </Notes>
    </Slide>
    <Slide>
      <Heading fit textColor="secondary" margin="0 0 20px">
        Оценка миграции приложения для клинеров
      </Heading>
      <Table style={{ borderSpacing: '0 15px', color: colors.white }}>
        <TableRow style={{ color: colors.red }}>
          <TableHeaderItem>Задача</TableHeaderItem>
          <TableHeaderItem>Количество</TableHeaderItem>
          <TableHeaderItem>Время</TableHeaderItem>
        </TableRow>
        <Appear>
          <TableRow>
            <TableItem>GET запрос</TableItem>
            <TableItem>30</TableItem>
            <TableItem>15 ч</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>POST запрос</TableItem>
            <TableItem>14</TableItem>
            <TableItem>15 ч</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Пагинация</TableItem>
            <TableItem>2</TableItem>
            <TableItem>2 ч</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Инвалидация</TableItem>
            <TableItem>13</TableItem>
            <TableItem>8 ч</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Валидация</TableItem>
            <TableItem>12</TableItem>
            <TableItem>5 ч</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Кеширование</TableItem>
            <TableItem>2</TableItem>
            <TableItem>5 м</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow>
            <TableItem>Оптимистичный UI</TableItem>
            <TableItem>3</TableItem>
            <TableItem>15 м</TableItem>
          </TableRow>
        </Appear>
        <Appear>
          <TableRow style={{ color: colors.red }}>
            <TableItem/>
            <TableItem>Итого</TableItem>
            <TableItem>45 ч 20 м</TableItem>
          </TableRow>
        </Appear>
        <Notes>
          Переписать сложнее чем написать с нуля, но писать с нуля нельзя,
          потому что слишком велик риск забыть что-то связать.
          <br/>
          <br/>
          Пагинация сейчас есть только на заказах, но хотелось бы её добавить в новости
          <br/>
          <br/>
          В 13 местах мы перезапрашиваем данные после действия.
          Например, после удаления назначения на заказ мы делаем 5 запросов,
          чтобы из приложения исчез заказ, появилась новость и изменились данные клинера.
          В мутации мы можем описать нужные данные и они вернуться в рамках одного запроса.
          <br/>
          <br/>
          На сервере валидируются действия с заказом, изменения расписания и графика,
          запросы на компенсацию химии и прохождении онлайн воронки.
          <br/>
          <br/>
          Кеширования сущности сейчас вообще нет. Имеет смысл кешировать сущности новости и заказа.
          <br/>
          <br/>
          Оптимистично можно реагировать на прочтение новости, оценку клиента, отправку обжалования.
          Раньше после оценки клиента клинер ждал порядка 20-30 секунд,
          пока бэкенд занимался автоназначением заказов
        </Notes>
      </Table>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary" margin="0 0 100px">Окупаемость миграции</Heading>
      <Appear>
        <Heading fit>10-15 задач с новыми запросами к серверу</Heading>
      </Appear>
    </Slide>
    <Slide bgColor="primary" textColor="tertiary">
      <Heading size={1} textColor="secondary" margin="0 0 50px">HR Бренд</Heading>
      <List>
        <Appear>
          <ListItem>Вакансии с GraphQL более привлекательны</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Информационные поводы для статей</ListItem>
        </Appear>
        <Appear>
          <ListItem>Поле для докладов на конференциях</ListItem>
        </Appear>
        <Appear>
          <ListItem margin="25px 0">Возможность нести экспертизу в массы</ListItem>
        </Appear>
      </List>
    </Slide>

    <Slide bgColor="primary" textColor="tertiary">
      <Heading fit textColor="secondary">
        Q & A
      </Heading>
    </Slide>
  </Deck>
);

export default Presentation;
