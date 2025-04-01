// 1)
// Первый аргумент - массив, второй - колбек-функция, которая применяется на массив
// Колбек-функция применяется на каждый элемент массива и проверяет условие
// Если хотя бы один раз колбек-функция вернула true, то any возвращает true
// Иначе - false

// Если колбек-функция не была передана, то из any возвращаем true,
//     если в массиве есть хотя бы один элемент, который дает true,
//     если все значения в массиве дают false, то возвращаем false

function any (arr, condition = false) {
    for (let i=0; i<arr.length; i++) {
        let isBackTrue = condition ? condition(arr[i]) : arr[i];
        // проходим по каждому элементу для проверки первого истиного, который удовлетворяет условию функции либо самому себе
        if (isBackTrue) {
            return true;
        }
    }
    return false
}

//  console.log(any([0, 1, 2, 0], x => x >= 2)); //-> true
//  console.log(any([0, 0, 1, 0])); //-> true
//  console.log(any([0, 0, 0, 0])); //-> false

// 2)
// Функция принимает 2 массива.
//     Возвращает новый массив, который состоит только из тех элементов,
//     которые встретились в одном массиве, но не встретились в другом
function arrayDiff(arr1, arr2) {
    const set1 = new Set(arr1); // создаём множество из массивов, исключаем дубликаты в каждом исходном массиве
    const set2 = new Set(arr2);
    const diff1 = [...set1].filter(item => !set2.has(item)); // получаем значения которых нет в парном массиве
    const diff2 = [...set2].filter(item => !set1.has(item));
    return [...diff1, ...diff2]; // возвращаем с помощью спрэд оператора общие значения 
}

 //console.log(arrayDiff([1, 2, 3], [1, 2, 4])); //-> [3, 4]
 //console.log(arrayDiff([1, 3, 3, 4], [1, 3, '4'])); //-> [4, '4']

// 3)
// Реализовать функцию forEachRight
// Первый аргумент - массив, второй - функция, применяется на массив в обратном порядке

// Пример:
//     Результатом работы функции forEachRight,
//     будет вывод элементов массива в обратном порядке в консоль.
//     Одно значение - один вывод (построчно)

function forEachRight(arr, clfunc) {
    for (let i=arr.length; i>0; i--){
        clfunc(arr[i-1]);
    }
}
// forEachRight([1, 2, 3, 4], val => console.log(val)); //-> в консоль 4 3 2 1

// 4)
// Функция принимает 2 массива, и возвращает массив объединенных значений,
//     без дублирования

function union (arr1, arr2) {
    return new Set([...arr1, ...arr2]);
}

// console.log(union([5, 1, 2, 3, 3], [4, 3, 2])); // -> [5, 1, 2, 3, 4]
// console.log(union([5, 1, 3, 3, 4], [1, 3, 4])); // -> [5, 1, 3, 4]

// 5)
// Реализовать функцию without.
//     Первый аргумент - массив, второй и последующие - значения

// Функция возвращает новый массив, который наполнен теми значениями,
//     которые не передавались как второй и последующие аргументы функции

function without (arr, ...val) {
    return arr.filter(item => !val.includes(item));
}

// console.log(without([2, 1, 2, 3], 1, 2)) //-> [3]

// 6)
// Реализовать функцию indexOfAll.
//     Первый аргумент - массив, второй - значение

// Функция возвращает массив со всеми индексами, которые соответствуют переданному значению
function indexOfAll(array, value) {
    let indices = [];
    let idx = array.indexOf(value);// метод idexOf() позволяет найти первое значение совподающее по указаному,
    // второй параметр указывает с кого индекса начинается поиск
    while (idx != -1) { // если искомого значения нет - метод возвращает -1
        indices.push(idx);
        idx = array.indexOf(value, idx + 1); // здесь мы увеличиваем индекс следующего элемента чтоб продолжить поиск остальных элементов
    }
    return array, indices;
}

//console.log(indexOfAll([1, 2, 3, 1, 2, 3], 1)); //-> [0, 3]
//console.log(indexOfAll([1, 2, 3], 4)); //-> []

// 7)
// Функция принимает массив meetups,
//     и возвращает суммарное количество человек, находящихся на активных митапах

//membersOnActiveMeetups(meetups); // 1500
function membersOnActiveMeetups (arrayMeetups) {
    return arrayMeetups.reduce((accumulator, currentValue) =>
       currentValue.isActive ? (accumulator + currentValue.members) : accumulator, 
    0 // значения аккамулятора мы передаём как второй аргумент после функции колл-бэк
    ); 
}

// Пример:
    // const meetups = [
    //     { name: 'JavaScript', isActive: true, members: 100 },
    //     { name: 'Angular', isActive: true, members: 900 },
    //     { name: 'Node', isActive: false, members: 600 },
    //     { name: 'React', isActive: true, members: 500 },
    // ];
 // console.log (membersOnActiveMeetups(meetups)); // 1500

// 8)
const factory = (xValue, yValue, funcSumName) => {
//...

this.x = xValue;
this.y = yValue;
this[funcSumName] = () =>  this.x + this.y // добавление функции с заланным именем
return this 
}
//const obj = factory(12, 23, 'myFunc');

//console.log(obj.x, obj.y, obj.myFunc()); // 12, 23, 35

//9)
const object = {
    id: 0,
    name: 'Obj-name',
    // ...
    toString() {
        return this.name; // Преобразование объекта в строку, когда объект используется в строковом контексте
    },
    valueOf() {
        return this.id; // Преобразование объекта в примитивное значение, контекст числовой
    },
};

// console.log(`Name: ${object}`); 		// Name: Obj-name
// console.log(+object);            		// 0
// console.log(object + 10);        		// 10

// 10)
// Каррирование
//add(4)(3)(1) //=> 8
//*/
// function add(a) { 
//     return function(b) {
//       return function(c) {
//         return a + b + c;
//       };
//     };
//   }
//const add = (x) => (y) => (z) => x+y+z; // - один из пособов передачи аргументов при каррировании
// либо ---> 
function curry(f) { // curry(f) выполняет каррирование
    return function(a) {
      return function(b) {
        return function(c) {
            return f(a, b, c);
        };
      };
    };
  }
  
  // использование
  function curriedSum(a, b, c) { //оборачиваемая функция
    return a + b +c;
  }
  
  let add = curry(curriedSum); // функция обёртки 
 //console.log(add(4)(3)(1));
 //11)
// На входе массив чисел, например: arr = [1, -2, 3, 4, -9, 6].

//     Задача: найти непрерывный подмассив в arr, сумма элементов в котором максимальна.

//     Функция getMaxSubSum(arr) должна возвращать эту сумму.

//     Если все элементы отрицательные – ничего не берём(подмассив пустой) и сумма равна «0»

function getMaxSubSum (array) {
    let maxSybSum = 0; // максимальная сумма
    let currentSybSum = 0; // текущая сумма
    for (let i of array) { //алгоритмом Кадане
        currentSybSum = Math.max(0, currentSybSum + i); // обнуляем если субмассив заходит в зону с минусовым значением
        maxSybSum = Math.max(maxSybSum, currentSybSum); // сравниваем с предыдущим субмассивом
    }
    return maxSybSum;
}

//     Например:

// console.log(getMaxSubSum([-1, 2, 3, -9])) //= 5 (сумма выделенных)
// console.log(getMaxSubSum([2, -1, 2, 3, -9])) //= 6
// console.log(getMaxSubSum([-1, 2, 3, -9, 11]))//= 11
// console.log(getMaxSubSum([-2, -1, 1, 2])) //= 3
// console.log(getMaxSubSum([100, -9, 2, -3, 5])) //= 100
// console.log(getMaxSubSum([1, 2, 3])) //= 6 (берём все)

//12)

function camelize(str) {
    return str
      .split('-') // разделить строку на массив слов
      .map((word, index) =>
        index === 0 ? word : word[0].toUpperCase() + word.slice(1)
      ) // преобразовать каждое слово, кроме первого
      .join(''); // объединить обратно в строку
  }
// console.log(camelize("background-color") == 'backgroundColor');
// console.log(camelize("list-style-image") == 'listStyleImage');
// console.log(camelize("-webkit-transition") == 'WebkitTransition');

// 13)
// Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет в нём элементы между a и b и отдаёт массив этих элементов.

//     Например:

function filterRange(arr, a, b){
    return arr.filter(num => (num >= a && num <= b));
}

let arr = [5, 3, 8, 1];
let filtered = filterRange(arr, 1, 4);
//console.log( filtered ); // 3,1
// 14)
// Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.

//     Например:

function unique(arr) {
    return [...new Set(arr)]; // конструкция Set работает с объектом удаляя повторяющеися элементы, 
                              // спрэд-оператором мы преобразуем в массив (также можно использывать Array.from)
  }

let strings = ['aaa', 'aaa', 'zzz', 'xxx', 'aaa', 'bbb', 'aaa',  'xxx', 'ccc'];

//console.log( unique(strings) ); // ['aaa', 'zzz', 'xxx', 'bbb', 'ccc']

// 15
// Напишите функцию sumTo(n), которая вычисляет сумму чисел 1 + 2 + ... + n.
function sumTo(n) {
    let sum = 0;
    for (let item = 0; item <= n; item++ ) {
        sum += item;
    }
    return sum;
}
//console.log(sumTo(3));

//16)
// Напишите функцию, которая принимает строку из одного или нескольких слов и возвращает ту же строку, но с перевернутыми словами из X и более букв (X — второй параметр ф-ии)..
// Переданные строки будут состоять только из букв и пробелов.
function spinWords(str, x) {
    return str
        .split(' ') //разбиваем на массив для того чтоб работать с отдельным словом
        .map((word) =>
        word.length > x //проверяем условие длины каждого слова
            ? word.split('').reverse().join('') //для переворота слова преобразуем в массив и обратно
            : word
        )
        .join(' '); // общий результат преобразуем в строку
}
//Examples:
// console.log(spinWords( "Hey fellow warriors", 5 )) //=> returns "Hey wollef sroirraw"
// console.log(spinWords( "This is a test", 10)) //=> returns "This is a test"
// console.log(spinWords( "This is another test", 3 )) //=> returns "sihT is rehtona tset"

// 17)
function filter_list (arr) {
    return arr.filter(item => typeof item == 'number');
}
//console.log(filter_list([1,2,'a','b'])); //== [1,2]
//console.log(filter_list([1,'a','b',0,15])); //== [1,0,15]
//console.log(filter_list([1,2,'aasf','1','123',123])); //== [1,2,123]

// 18)
// Возвести в квадрат каждую цифру числа и соединить их.
// Например, если мы запустим 9119 через функцию, выйдет 811181, потому что 9^2 - это 81, а 1^2 - 1.
// Примечание: функция принимает целое число и возвращает целое число.
function connectSquares (num) {
    return num
        .toString() //преобразуем числов строку
        .split('') //разделяем на массив чисел
        .map(digit =>
            (digit ** 2).toString() // возводим в кадрат и преобразуем в строку
        )
        .join(''); // склеваем в строку
}
//console.log(connectSquares(9119)); //  811181
// 19)
// Написать функцию persistence, которая принимает положительный параметр num и возвращает число,
// которое нужно умножить цифры в num, пока не дойдете до единственной цифры.

function persistence(num) {
    let count = 0;
    while (num > 9) {
      let digit = 1;
      const numStr = String(num);
      for (let i = 0; i < numStr.length; i++) {
        digit *= parseInt(numStr[i]);
      }
      num = digit;
      count++;
    }
    return count;
  }

// Примеры:
//console.log(persistence(39) === 3) 	// because 3*9 = 27, 2*7 = 14, 1*4=4
//                        			// and 4 has only one digit

//console.log(persistence(999) === 4) 	// because 9*9*9 = 729, 7*2*9 = 126,
//                         		// 1*2*6 = 12, and finally 1*2 = 2

//console.log(persistence(4) === 0) 		// because 4 is already a one-digit number

//20)
// Создать функцию с именем divisors / Divisors, которая принимает целое число n> 1 и возвращает массив со всеми делителями целого числа (кроме 1 и самого числа),
// от наименьшего до наибольшего. Если число простое, вернуть строку '(integer) is prime'.

function divisors (num) {
    let dev = [];
    for (let i = 2; i < (num/2); i++) {
        (num % i) == 0 ? dev.push(i) : null;
    }
    if (dev.length){
        return dev;
    }
    return `${num} is prime`;
}

// Примеры:
//console.log(divisors(12)); // should return [2,3,4,6]
// console.log(divisors(25)); // should return [5]
// console.log(divisors(13)); // should return "13 is prime"

// 21)
// Дана строка. Вернуть длину самого короткого слова
function getLengthOfShortestWord(str) {
    return str
        .replace(/[.,]/g, '')
        .split(' ')
        .reduce((a, b) => a.length <= b.length ? a : b)
        .length;

}
// Пример:
//console.log(getLengthOfShortestWord("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."))// => 2


// 22)
// Написать ф-ию, которая принимает 3 целочисленных значения a, b, c. Ф-ия должна возвращать true,
// сли треугольник можно построить со сторонами заданной длины, и false в любом другом случае.
function isTriangle(a, b, c) {
    return a + b > c && a + c > b && b + c > a;
}
// Примеры:
// console.log(isTriangle(1,2,2));// true
// console.log(isTriangle(7,2,2));// false

// 23)
// Вернуть средний символ слова. Если длина слова нечетная, вернуть средний символ.
// Если длина слова четная, вернуть 2 средних символа.
function getMiddle(word) {
    let lengthWord = word.length;
    if (lengthWord % 2 == 0) {
        return word[lengthWord/2 - 1] + word[lengthWord/2];
    } else {
        return word[Math.floor(lengthWord / 2)];
    }
}
// Примеры:
// console.log(getMiddle("test")) //should return "es"
// console.log(getMiddle("testing")) //should return "t"
// console.log(getMiddle("middle")) //should return "dd"
// console.log(getMiddle("A")) //should return "A"


// 24)
// Дан массив чисел. Необходимо отсортировать нечетные числа в порядке возрастания, 
// оставив четные числа на их исходных позициях.
function sortOddDigit (arr) {
    let oddNumbers = arr.filter(num => num % 2 !== 0).sort((a, b) => a - b); // создайм массив из нечётных и сортируем
    let index = 0;

    return arr.map(num => num % 2 !== 0 ? oddNumbers[index++] : num); //подставляем нечётные числа из массива выше

}
// Примеры:
console.log(sortOddDigit([7, 1]))  //=>  [1, 7]
console.log(sortOddDigit([5, 8, 6, 3, 4]))  //=>  [3, 8, 6, 5, 4]
console.log(sortOddDigit([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]))  //=>  [1, 8, 3, 6, 5, 4, 7, 2, 9, 0]