const astParser = require("../ast");

function checkVariableValueByExpectedValue(kind, name, expexctedValue, ast) {
  const result = {
    success: false,
    message: `Змінна, оголошена за допомогою '${kind}', з ім'ям '${name}' і значенням '${expexctedValue}' не знайдена.`,
  };

  // находим в дереве переменные с нужным типом (kind)
  const getNodes = astParser.select(ast, (path) => {
    return path.isVariableDeclaration({ kind: kind });
  });
  // console.log("getNodes[0] :>> ", getNodes[0]);

  // находим в дереве переменную с нужным типом именем (name)
  const namedNodes = astParser.select(getNodes, (path) => {
    return path.isIdentifier({ name: name });
  });

  // если такая переменная с нужным типом и именем существует, то только тогда продолжаем дальнейшие манипуляции по поиску и сравнению ее значение с ожидаемым значением (expexctedValue)
  if (namedNodes.length === 1) {
    //получаем доступ к значению
    const currentValue = astParser.select(getNodes, (path) => {
      if (typeof expexctedValue === "string") {
        const res = path.isStringLiteral({ value: expexctedValue });
        if (res) {
          result.success = true;
          result.message = `Знайдена змінна ${name} зі значенням ${expexctedValue}`;
          return result;
        }
      }
      if (typeof expexctedValue === "number") {
        const res = path.isNumericLiteral({ value: expexctedValue });
        if (res) {
          result.success = true;
          result.message = `Знайдена змінна ${name} зі значенням ${expexctedValue}`;
          return result;
        }
      }
      if (typeof expexctedValue === "boolean") {
        const res = path.isBooleanLiteral({ value: expexctedValue });
        if (res) {
          result.success = true;
          result.message = `Знайдена змінна ${name} зі значенням ${expexctedValue}`;
          return result;
        }
      }
    });
    // console.log("currentValue[0].value :>> ", currentValue[0].value);
  }

  return result;
}

exports.checkVariableValueByExpectedValue = checkVariableValueByExpectedValue;
