/**
 * 
 *  Módulos: são conjuntos de códigos.
 * 
 * 3 tipos de módulos:
 * -> Todos os arquivos JavaScript são módulos
 * -> Nativos
 * -> npm (Node Package Manager)
 * 
 * 
 * */

const { printName, lastName } = require("./printName");

printName(`Natan ${lastName}`)