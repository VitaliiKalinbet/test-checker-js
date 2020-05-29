const astParser = require("../ast");

function findAssignExpression(expectedLeft, expectedRight, ast) {
  const result = {
    success: false,
    message: `Змінній ` + expectedLeft + " має бути присвоєне значення " + expectedRight,
  };

  //Ищем все присвоения (isAssignmentExpression)
  const assignExpressions = astParser.select(ast, (path) => {
    return path.isAssignmentExpression();
  })

  //Ищем нужную часть
  for(var i = 0; i < assignExpressions.length; i++) {
    const exp = assignExpressions[i];

    const left = exp.left.name;
    const right = exp.right.name;
    console.log("ASSIGN");
    console.dir(exp.left);
    console.log(right);

    if (left === expectedLeft && right === expectedRight) {
      result.success = true;
      result.message = "Змінній " + expectedLeft + " присвоєно значення " + expectedRight;
    } else if (left === expectedLeft) {
      result.message = "Змінній щось присвоїли, але потрібно присвоїти " + expectedRight;
    }
  }

  return result;
}

exports.findAssignExpression = findAssignExpression;
