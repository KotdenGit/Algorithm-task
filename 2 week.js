//1. Написать свою кастомную функцию map и добавить в прототип Array

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
console.log(result); // должно вывести количество файлов в структуре
                    //В приведенном примере, результат должен быть равен 8, так как в структуре восемь файлов.