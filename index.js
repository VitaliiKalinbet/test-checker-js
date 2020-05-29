const astParser = require("./util/ast");
const {
  findVariableByNameAndType,
} = require("./util/helpers/findVariableByNameAndType");
const {
  checkVariableValueByExpectedValue,
} = require("./util/helpers/checkVariableValueByExpectedValue");
const { findExpression } = require("./util/helpers/findExpression");

const js1 = `
let word;
const hello = "Hello Word";
word = hello;
`;
console.dir(check(js1));

// const js2 = `
// let word;
// const hello = "Hello Word"
// word = hello;
// const refWord = document.querySelector('.word');
// ref.textContent = word
// `;
// console.dir(check(js2));

// const js3 = `
// const result = 12 + 24 / 3;
// const refResult = document.querySelector('.result');
// ref.textContent = word
// `;
// console.dir(check(js3));

// const js4 = `
// const title = document.querySelector('.title');
// title.textContent = 'Іван Шевченко';
// `;
// console.dir(check(js4));

// const js5 = `
// const refs = {
//   userName: document.querySelector('.user-name'),
//   title: document.querySelector('.title'),
//   boxTitle: document.querySelector('.box-title'),
// }
// `;
// console.dir(check(js5));

// const js6 = `
// const user = {
//   name: 'Іван',
//   title: 'Дошка моїх мрій'
//   boxTitle0: 'Я хочу',
//   boxTitle1: 'Для цього я зароблю',
//   boxTitle2: 'Для цього я розвину',
// }
// `;
// console.dir(check(js6));

// const js7 = `
// const refs = {
//   userName: document.querySelector('.user-name'),
// }
// const user = {
//   name: 'Іван',
// }
// refs.userName.textContent = user.name;
// `;
// console.dir(check(js7));

function check(code) {
  let result = {
    res: [],
    rej: [],
    success(msg) {
      this.res.push(msg);
    },
    failed(msg) {
      this.rej.push(msg);
    },
  };

  try {
    const ast = astParser.parse(code);

    const results = [
      //============================js1 ===========================
      findVariableByNameAndType("let", "word", ast),
      findVariableByNameAndType("const", "hello", ast),
      checkVariableValueByExpectedValue("const", "hello", "Hello Word", ast),
      // checkVariableValueByExpectedValue("let", "word", "Hello world", ast),
      // findExpression(),

      //============================js2 ============================
      // findVariableByNameAndType("let", "word", ast),
      // findVariableByNameAndType("const", "hello", ast),
      // checkVariableValueByExpectedValue("const", "hello", "Hello Word", ast),
      // findVariableByNameAndType("const", "refWord", ast),
    ];

    results.map(({ success, message }) => {
      if (success) {
        result.success(message);
      } else {
        result.failed(message);
      }
    });
  } catch (ex) {
    console.log(ex);

    result.failed("Помилка компіляції, перевірте ваш код");
  }
  return result;
}
