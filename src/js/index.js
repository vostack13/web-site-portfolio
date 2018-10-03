import skills from './skills'

let a = 1;
let b = 2;

let addition = (a, b) => a + b;

let state = {
    errors: {
        firstname: '',
        lastname: '',
        password: '',
    },
}

console.log(a);
console.log(b);
console.log(addition(a, b));