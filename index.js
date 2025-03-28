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