const astParser = require("../ast");

function findVariableByNameAndType(type, name, ast) {
  const result = {
    success: false,
    message: `Змінна, оголошена за допомогою '${type}', з ім'ям '${name}' не знайдена.`,
  };

  // проверяем есть ли в дереве такая переменная с типом type
  const getNodes = astParser.select(ast, (path) => {
    return path.isVariableDeclaration({ kind: type });
  });
  if (getNodes.length < 1) {
    //если не находим переменную с указанного типа, то завершаем проверку
    result.message = `Не знайдено оголошення змінної за допомогою '${type}'.`;
    return result;
  }

  // проверяем среди найденных переменных нужного типа (getNodes) их имена и ищем нужное нам имя
  const namedNodes = astParser.select(getNodes, (path) => {
    return path.isIdentifier({ name: name });
  });
  if (namedNodes.length === 1) {
    // если нашли нужное и оно одно, то завершаем проверку успехом
    result.success = true;
    result.message = `Змінна, оголошена за допомогою '${type}', з ім'ям '${name}' знайдена!`;
    return result;
  } else if (namedNodes.length > 1) {
    // если нашли нужное и их несколько, то завершаем проверку
    result.message = `Знайдено більше одного оголошення змінної ${name} за допомогою ${type}.`;
    return result;
  }

  // если переменных с типом type нет и имененм name нету то завершаем проверку не успешно, дефолтнфм объектом result
  return result;
}

exports.findVariableByNameAndType = findVariableByNameAndType;
