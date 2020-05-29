```js
// 1
const refs = {
  userName: document.querySelector('.user-name'),
  title: document.querySelector('.title'),
  boxTitle: document.querySelector('.box-title'),
}

// 2
const user = {
  name: 'Іван',
  title: 'Дошка моїх мрій'
  boxTitle0: 'Я хочу',
  boxTitle1: 'Для цього я зароблю',
  boxTitle2: 'Для цього я розвину',
}

// 3
const refs = {
  userName: document.querySelector('.user-name'),
}
const user = {
  name: 'Іван',
}
refs.userName.textContent = user.name;
```