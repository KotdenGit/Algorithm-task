//1. Написать свою кастомную функцию map и добавить в прототип Array

Array.prototype.customMap = function(callback) {
    const result = []; // Создаем новый массив для результатов

    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {                // Проверяем чтобы избежать обработки унаследованных свойств.
            result.push(callback(this[i], i, this)); // Вызываем коллбэк и добавляем результат
        }
    }

    return result; // Возвращаем новый массив с преобразованными значениями
};

const numbers = [1, 2, 3, 4];
const doubled = numbers.customMap(num => num * 2);

console.log(doubled); // [2, 4, 6, 8]

//2. Написать свою функцию глубокого копирования

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj; // Возвращает примитивные значения как есть
    }
  
    if (Array.isArray(obj)) {
      return obj.map(deepClone); // Копирует массив, рекурсивно вызывая deepClone
    }
  
    // Создает новый объект и копирует свойства
    const clone = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key]); // Рекурсивное копирование
      }
    }
  
    return clone;
  }

const original = { a: 1, b: { c: 2 } };
const copy = deepClone(original);
//console.log(copy)
copy.b.c = 42; // Оригинальный объект НЕ изменится
//console.log(original.b.c); // 2
  

//3. Задача на обход объекта рекурсивно:
//Представьте, что у вас есть объект, представляющий файловую структуру, где ключами являются имена файлов или папок, а значениями – либо подобные объекты для вложенных папок, либо строки для файлов. Напишите функцию countFiles, которая рекурсивно обходит эту структуру и возвращает количество файлов внутри.

const fileStructure = {
    folder1: {
        file1: 'content',
        folder2: {
            file2: 'content',
            file3: 'content',
            folder3: {
                file4: 'content',
                file5: 'content',
            }
        }
    },
    folder4: {
        file6: 'content',
        file7: 'content',
    },
    file8: 'content',
};

function countFiles(obj) {
    let count = 0;

    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            count++; // Если значение — строка, это файл, увеличиваем счетчик
        } else if (typeof obj[key] === 'object') {
            count += countFiles(obj[key]); // Рекурсивный вызов для папки
        }
    }

    return count;
}

const result = countFiles(fileStructure);
//console.log(result); // должно вывести количество файлов в структуре - 8

//4. Написать свою функцию, которая будет принимать массив и возвращать вложенный объект,
// где ключами будут элементы массива, а значениями - вложенные объекты. 
function arrayToNestedObject(arr) {
    // Начинаем с пустого объекта
    let nestedObject = null;

    // Проходим по массиву с конца, чтобы вложенность была правильной
    for (let i = arr.length - 1; i >= 0; i--) {
        nestedObject = { value: arr[i], next: nestedObject };
    }

    return nestedObject;
}

// Пример использования
const array = [1, 2, 3, 4];
const nestedObject = arrayToNestedObject(array);
console.log(JSON.stringify(nestedObject, null, 2));

//5. Написать функцию, которая будет возвращать n-ое число Фибоначчи без рекурсии.
// Последовательность Фибоначчи: 0, 1, 1, 2, 3, 5, 8, 13, ...
function nthFibo(n) {
    if (n === 1) return 0;
    if (n === 2) return 1;
    
    let a = 0;
    let b = 1;
    let next;
    
    for (let i = 3; i <= n; i++) {
      next = a + b;
      a = b;
      b = next;
    }
    
    return b;
  }
  
  // Пример использования:
  //console.log(nthFibo(4)); // Выведет 2
  

//catch() можно чейнить (цепочкой), чтобы обрабатывать последующие ошибки.

const promise2 = new Promise((resolve, reject) => {
    reject("Ошибка!");
});

promise2
    .then(result => {
        console.log(result);
    })
    .catch(error => {					//ловит "Ошибка!" и создаёт новую ошибку (Promise.reject("Новая ошибка!")).
        console.log(error);
        return Promise.reject("Новая ошибка!");
    })
    .catch(error => {					//ловит эту новую ошибку ("Новая ошибка!").
        console.log(error); 
    })
    .finally(() => {
        console.log("Завершено!");			//всегда выполняется, даже если промис был отклонён.
    });

//результат в консоли - Ошибка!, Новая ошибка!, Завершено!


//микро и макро таски
setTimeout(function timeout() {
 console.log('1');               //ставится в очередь макрозадач.  
 }, 0);

let p = new Promise(function(resolve, reject) {
 console.log('2');		//выполняется сразу (из new Promise()).
 resolve();
 });

p.then(function(){
 console.log('3');		//ставится в очередь микрозадач.
 });

console.log('4');               //выполняется сразу.

// результат консоли 2-4-3-1


// задачи стэк вызова: очередь и инвент луп
console.log(1); 

setTimeout(() => console.log(2));    //Макрозадача → отправляется в очередь таймеров, будет выполнена позже.

Promise.reject(3).catch(console.log);  //Микрозадача → Promise.reject(3) переходит в catch() и выводит 3.

new Promise(resolve => setTimeout(resolve)).then(() => console.log(4)); //Асинхронный setTimeout(resolve) → ставится в очередь макрозадач,
                                                                         //then(...) выполнится позже.
Promise.resolve(5).then(console.log);  //Микрозадача → Promise.resolve(5) сразу завершится и then(console.log) выведет 5.

console.log(6);                        //Синхронная задача → выводит 6.

setTimeout(() => console.log(7),0);   //Еще одна макрозадача → ставится в очередь таймеров

//1,6,3,5,2,7,4