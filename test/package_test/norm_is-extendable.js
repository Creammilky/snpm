var isExtendable = require('is-extendable');
function f1(){
    console.log("Here");
}
console.log(isExtendable(f1));
let arr=[1,2,3];
console.log(isExtendable(arr));