const astParser = require("../ast");

function checkVariableValueByExpectedValue(kind, name, expexctedValue, ast) {
  const result = {
    success: false,
    message: `Змінна, оголошена за допомогою '${kind}', з ім'ям '${name}' і значенням '${expexctedValue}' не знайдена.`,
  };

  const getNodes = astParser.select(ast, (path) => {
    return path.isVariableDeclaration({ kind: kind });
  });

  return result;
}

exports.checkVariableValueByExpectedValue = checkVariableValueByExpectedValue;
