const parser = require('@babel/parser')
const traverse = require("@babel/traverse").default;

function select(astNode, matchFunction) {
   if (astNode instanceof Array) {
     let result = [];
     
     astNode.forEach(node => {
         selectSingle(node, matchFunction).forEach(selectedNode => {
             result.push(selectedNode);
         });
     });

     return result;
   } else {
     return selectSingle(astNode, matchFunction);
   }
}

function selectSingle(astNode, matchFunction) {
    let result = [];

    const traverseBlock = {
        enter(path) {
            try {
                if (matchFunction(path)) {
                    path.node.parentPath = path;
                    result.push(path.node);
                }
            } catch(ex) {
                console.log(ex);
            }
           
        }
    };

    if (astNode.parentPath) {
        traverse(astNode, traverseBlock, astNode.parentPath, astNode.parentPath.scope);
    } else {
        traverse(astNode, traverseBlock);
    }

    return result;
}

exports.select = select;

exports.parse = (code) => parser.parse(code);