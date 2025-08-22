// // let marks = [10, 20, 30, 40, 50];
// // console.log(marks); 

// let heroes = ["Ironman", "Thor", "Hulk", "Captain America", "batman"];
// console.log(heroes);
 
// // forloop
//  for (let idx = 0 ; idx < heroes.length; idx++) {
//      console.log(heroes[idx]);
//  }

// // for of
// for (let hero of heroes){
//     console.log(hero.toUpperCase());
// }

// //SUM OF ARRAYS
// let marks = [85, 97, 44, 37, 99, 45];
// let sum = 0;
// for (let mark of marks) {
//     sum += mark;
// }

// let avg = sum / marks.length;
// console.log(` avg marks of the class = ${avg}`);


// //OFFER ARRAYS
// let items =  [250, 645, 789, 456, 123, 654, 98];

// //for of loop
// let i = 0;
// for (let val of items) {
//     let offer = val / 10;
//     items[i] = items[i] - offer;
//     console.log(`value after offer = ${items[i]}`);
//     i++;    
// }

// //forloop
// for (let i = 0; i < items.length; i++) {
//     let offer = items[i] / 10;
//     items[i] -= offer;
// }

// console.log(items);


//ARRAY METHODS

// //push method
// let foodItems =  ["pizza", "burger", "pasta", "samosa", "biryani"];
// foodItems.push("paneer", "salad", "dosa");
// console.log(foodItems);

// //pop method
// let foodItems =  ["pizza", "burger", "pasta", "samosa", "biryani"];
// let deletedItem = foodItems.pop();
// console.log(foodItems);
// console.log("deleted", deletedItem);

// //CONCAT METHOD
// let foodItems =  ["pizza", "burger", "pasta", "samosa", "biryani"];
// let drinks = ["water", "juice", "milk", "soda"];
// let indianfood = ["dal", "bhaat", "roti", "sabji"]

// let dine = foodItems.concat(drinks, indianfood);
// console.log(dine);

// //UNSHIFT METHOD
// let marvelheroes = ["ironman", "thor", "hulk", "captain america"];

// marvelheroes.unshift("spiderman");

// // //SHIFT METHOD
// let indianheroes = ["shaktiman", "krish", "hero", "ra.one"];
// let val = indianheroes.shift();
// console.log("deleted", val);

// // // SLICE METHOD
// let foodItems =  ["pizza", "burger", "pasta", "samosa", "biryani"];
// console.log(foodItems);
// console.log(foodItems.slice(1, 4));

// //SPLICE METHOD
// let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// arr.splice(2, 3, 10, 12);

//ADD ELEMENTS
// arr.splice(2, 0, 10, 12);

//DELETE ELEMENTS
// arr.splice(2, 3);

//REPLACE ELEMENTS
// arr.splice(4, 1, 10);


//PRACTICE
// let compnies = ["TCS", "WIPRO", "INFOSYS", "ACCENTURE", "GOOGLE", "IBM"];
// compnies.splice(2, 1, "TATA");
// compnies.push("TATA", "MAHINDRA", "HCL");
