# Home project: facegit

[Пример первой части](http://5a19a183a6188f20378c66f1.brave-golick-d6a52f.netlify.com).

Начинаем 1ый большой домашний проект на 3 занятия. Закончить его нужно будет к пятнице _1.12.17_,
тогда же начнется второй домашний проект, на 4 занятия.

Задачи будут пополнятся, в среду мы изучим как запускать тесты в облаке, и производить деплой на
другие сервера.

Высокий старт будет компенсируется легкими дополнениями. Следующие 2 порции задач будут гораздо
проще, не волнуйтесь из-за объема 😉.

## Описание проекта

Мы разрабатываем клиент для github, где можно гулять по друзьям, репозиториям, смотреть issues,
комиты и так далее.

## Задачи. I часть

Для начала мы реализуем простой функционал хождения по последователям. Я расскажу, какие файлы нужно
создать, и что именно протестировать, но всю работу вам прийдется выполнять самим. Тесты для тех
вещей, которые мы не проходили, я буду добавлять к проекту.

```bash
├── actions
│   ├── auth.js
│   ├── repos.js
│   └── users.js
├── api.js
├── components
│   ├── AppRouter
│   ├── AuthPage
│   ├── Follower
│   ├── Followers
│   ├── PrivateRoute
│   └── UserPage
├── index.css
├── index.js
├── reducers
│   ├── auth.js
│   ├── followers.js
│   ├── index.js
│   └── users.js
├── sagas
│   ├── auth.js
│   ├── followers.js
│   ├── index.js
│   └── users.js
├── setupTests.js
└── store.js
```

> Компонента `PrivateRoute` это один из способов проверки, можно ли пользователю посещать страницу.
> Изучите этот компонент, в будущем вам понадобятся знания его реализации.

---

> Файл api содержит логику по работе с токеном авторизации, распологать там ключ нужно с помощью
> саги `auth`.

---

1. Обычно все проекты начинаются с роутера, по этому надо начать написание компонента `AppRouter`, в
   котором должен `react-router-dom`.
1. Для компоненты `AppRouter` нужно **написать тесты**:
   * Проверить наличие `Switch`,
   * Проверить наличие компоненты `<PrivateRoute path="/user/:name" />`,
   * Проверить наличие комполненты `<Route path="/login" />`,
   * Проверить наличие редиректа на `/user/dex157`(В последующем мы изменим немного авторизацию).
1. Написать компонент `UserPage`, который содержит верстку аватара пользователя, информацию о
   пользователе и компонент `Followers`, который возвращает список последователей. При монтировании
   нужно делать запрос на получение информации о пользователе. Если в будущем, мы переходим на
   другую страницу, компонент `UserPage` не будет заново мантироваться, по этому, с помощью
   `componentWillReceiveProps` нужно следить, когда поменяется пропс `{ match: { params: { name
   }}}`. Не забудьте сделать проверки в методе `render` на `isFetching` и на то, что пользователь
   присутствует.
1. **Написать тесты** для компоненты UserPage:
   * Проверить наличие метода componentDidMount,
   * Проверить наличие метода componentWillReceiveProps,
   * Проверить наличие спинера/лоадера если props.isFetching === true,
   * Проверить наличие сообщения об отсутствии пользователя если isFetching === false && user ==
     null,
   * В основной верстке должен быть:
     * аватар пользователя,
     * login пользователя,
     * количество фаловеров пользователя,
     * компонент Followers с передачей login через props.
1. Написать экшены, редьюсеры и сагу для получения данных о пользователе. При новом запросе
   пользователя, нужно удалять данные о предыдущем пользователе.
1. **Написать тесты** для редьюсера `users`:
   * Проверить, что экшены `fetchUserRequest`, `fetchUserSuccess`, `fetchUserFailure`:
     * изменяют флаг `isFetching`,
     * изменяют флаг `isFetched`,
     * очищают поле `data`, если приходит экшен `fetchUserRequest`,
     * наполняют данными `data`, если приходит экшен `fetchUserSuccess`,
     * очищают поле `error`, если приходит экшен `fetchUserRequest` или `fetchUserSuccess`,
     * наполняют данными `error`, если приходит экшен `fetchUserFailure`.
1. **Написать тесты** для саги `sagas/users`

   <details> <summary>Как писать тесты для саг?</summary>

   Здесь описан пример тестирования саг, для саги `users` достаточным будет написание этого набора
   тестов, для следующих саг вам потребуется написать тесты самим.

   ```js
   import {fetchUserSuccess, fetchUserFailure} from '../../actions/users';
   import {call, put} from 'redux-saga/effects';
   import {fetchUserSaga} from '../users';
   import {getUserInformation} from '../../api';

   describe('Saga users:', () => {
     it('call getUserInformation', () => {
       const action = {payload: 'test_login'};
       const saga = fetchUserSaga(action);
       expect(saga.next().value).toEqual(call(getUserInformation, 'test_login'));
     });
     it('dispatch action fetchUserSuccess with user from call on success call', () => {
       const action = {payload: 'test_login'};
       const user = {login: 'test', id: '1'};
       const saga = fetchUserSaga(action);
       saga.next();
       expect(saga.next(user).value).toEqual(put(fetchUserSuccess(user)));
     });
     it('dispatch action fetchUserFailure with error from call on failure', () => {
       const action = {payload: 'test_login'};
       const error = new Error('test error');
       const saga = fetchUserSaga(action);
       saga.next();
       expect(saga.throw(error).value).toEqual(put(fetchUserFailure(error)));
     });
   });
   ```

    </details>

1. Написать компонент `Followers`. При монтировании этого компонента необходимо делать запрос на
   последователей пользователя. Очень удобно передавать `login`(идентификатор пользователя) текущего
   пользователя от `UserPage` к `Followers` через props. Не забудьте проверку на `isFetching`.
1. **Написать тесты** для компоненты `Followers`:
   * Проверить наличие метода класса `componentDidMount`,
   * Проверить наличие лоадера/спинера, если `isFetcing === true`,
   * Проверить что возвращаются компоненты `Followers` в том количестве, в котором передаются в
     props.followers.
1. Написать экшены, редьюсеры и саги для получения последователей(followers).
1. **Написать тесты** для саги `followers`:
   * Проверить наличие вызова call с правильными аргументами,
   * Проверить success и failure ветку исполнения.
1. **Написать тесты** для редьюсера `followers`:

   * Проверить, что экшены `fetchFollowersRequest`, `fetchFollowersSuccess`,
     `fetchFollowersFailure`:
     * изменяют флаг `isFetching`,
     * изменяют флаг `isFetched`,
     * очищают поле `ids`, если приходит экшен `fetchFollowersRequest`,
     * наполняют данными `ids`, если приходит экшен `fetchFollowersSuccess`,
     * очищают поле `error`, если приходит экшен `fetchFollowersRequest` или
       `fetchFollowersSuccess`,
     * наполняют данными `error`, если приходит экшен `fetchFollowersFailure`.

1. Компонент `Follower` очень простой, он содержит аватар и ссылку на страницу пользователя.
1. **Написать тесты** для компоненты `Follower`:
   * Проверить наличие аватара,
   * Проверить наличие `login` пользователя переданного через props,
   * Проверить что ссылка с логина пользователя ведет на `/user/{user.login}`.

### Как начать писать проект

Когда вам нужно приступать к написанию новых проектов, начинайте написание проекта с первой
компоненты, которая выводит вам что то простое, например пустой div. Посмотрите, какие данные и
логику нужно расположить на странице, в случае с UserPage, нужно получить данные по пользователю,
значит отправить экшен о получении данных. Так как нужно совершить запрос, вам понадобится 3 экшена,
флаги сетевых запросов, редьюсер для данных и для ошибки. После отправки экшена, нужно убедиться что
экшен действительно отправляется, это удобно делать через redux devtools. После того как экшен
отправляется, можно приступить к написанию саги, которая обрабатывает запрос. Сага должна получать
данные, и отправлять их в редьюсер. Как только вы увидете данные в редьюсере, можно приступать к
написанию верстки данных. Следующие шаги повторяют пройденные, смотрим какие данные нужны, какие
компоненты написать, как описать получение данных из сети.

<details>
<summary>Как работает авторизация?</summary>

Авторизация в этой домашней работе происходит с помощью токена который вы передаете в форме, на
странице `login`. Авторизация работает следующим образом, пользователь должен ввести токен, после
нажатия кнопки Еnter, компонент отправляет экшеном токен, который с помощью саги передается в модуль
api. Теперь все запросы будут содержать ключ авторизации, и гитхаб не будет ограничивать сетевые
запросы приложения, но даже с ключом там есть лимит на 5000 запросов, так что не удивляйтесь, если
вас заблокируют на 10-15 минут при очень большом количестве запросов.

</details>

<details>
<summary>Как писать тесты для компонент с connect()()</summary>
Не нужно импортировать в тест компонент обернутый в метод connect, нужно делать отдельный экспорт компоненты, без обертки в метод connect, и тестировать только такой компонент.

```js
// App.js

export class App extends Component {

...
}

export default connect()(App)



// App.test.js

import {App} from './App'

...
```

</details>
<details>
<summary>Как подключить спиннер?</summary>

Если вы хотите такой же спиннер как примере кода, то используйте следующий код:

```js
import Spinner from 'react-svg-spinner';
...
if (isFetching) {
  return <Spinner size="64px" color="fuchsia" gap={5} />;
}
```

</details>

## Задачи. II часть

Я добавил совсем немного, axios, работа с localstorage, что бы все время не вбивать ключ. Вам нужно
немного, при работе с axios у вас поменяется ответ от него, нужно чучуть поменять ваши саги. +
Теперь работа с localstorage, изучите работу саги sagas/auth.js и нужно дописать тесты для этой
саги, один сценарий описан, нужен еще один для всех шагов =)

1. Написать сценарий тестов, на тот случай, если в localstorage нет ключа.
1. Переписать свои саги под работу с axios.
