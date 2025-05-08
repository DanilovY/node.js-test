// import path from 'node:path';
// import fs from 'node:fs';
// import * as fs from 'node:fs';
import fs from 'node:fs/promises';

// const world = 'Hello World';

// console.log(world);

// const worldd = 'Hello';
// console.log(worldd);

//---------------------------------------- path путь папок и файлов ---------------------------------------------//

// // приклад для побудови шляху з його частин
// const somePath = path.join('some_folder', 'some_file.txt');
// // somePath буде 'some_folder/some_file.txt' на MacOs

// // somePath буде 'some_folder\\some_file.txt' на Windows
// console.log(somePath);

// const pathToWorkDir = path.join(process.cwd());
// console.log(pathToWorkDir);
// const pathToFile = path.join(pathToWorkDir, 'some_folder', 'some_file.txt');
// console.log(pathToFile);

// const roor = path.parse(
//   'C:\\Users\\Admin\\projects\\node.js-test\\some_folder\\some_file.txt',
// );
// // { root: 'C:\\\' ,
// //    dir: 'C:\\path\dir' ,
// //    base: 'file.txt' ,
// //    ext: '.txt' ,
// //    name: 'file' }
// console.log(roor);

//---------------------------------------- 3 разновидностей – синхронная функция, асинхронная с колбеком или асинхронная на промесах---------------------------------------------//
//---------------------------------------- синхронная функция---------------------------------------------//
//---------------------------------------- синхронная функция readFileSync обезательно Sync!!!---------------------------------------------//
//---------------------------------------- import * as fs from 'node:fs'; ---------------------------------------------//

// const fileContent = fs.readFileSync('./data.txt', 'utf-8');
// console.log(fileContent);

//---------------------------------------- aсинхронная с колбеком ---------------------------------------------//
//---------------------------------------- import * as fs from 'node:fs'; ---------------------------------------------//

// const fileContent = fs.readFile('path_to_file', (err, fileContent) => {
//   /* ваш код */
// });
// console.log(fileContent);

//---------------------------------------- aсинхронная с промесями ---------------------------------------------//
//---------------------------------------- import fs from 'node:fs/promises'; ---------------------------------------------//

// const fileContent = await fs.readFile('path_to_file');

//-----------------------------------------Buffer --------------------------------------------//

const buffer = await fs.readFile('data.txt', 'utf-8');
// Предположим, что в файле hello.txt был текст hello!

console.log(buffer);
///<Buffer 68 65 6c 6c 6f 0d 0a>
