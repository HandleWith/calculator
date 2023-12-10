const btn = document.querySelectorAll(".calc-button"),
  row = document.querySelectorAll(".calc-row")[1],
  radical = document.querySelector(".radical"),
  plus = document.querySelector(".plus"),
  minus = document.querySelector(".minus"),
  multiply = document.querySelector(".multiply"),
  divide = document.querySelector(".divide"),
  equals = document.querySelector(".equals"),
  c = document.querySelectorAll(".clear"),
  result = document.querySelectorAll(".calc-row")[0];

let ex = 0
let intermidExt = ""
const operations = ["+", "-", "/", "*", "."]
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ")", "("]
const allButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "/", "*", ".", "(", ")", "c", "Backspace", "="]
let isCalculated = false

const chekType = (e) => {
    if(e instanceof MouseEvent) {
      return e.target.innerHTML
    }
    else if(e instanceof KeyboardEvent) {
      return e.key
    }
}

const show = (e) => {
  let value = chekType(e)
  if (nums.includes(value)) {
    if (isCalculated) {
      if(!operations.includes(ex[ex.length-1])) {
        clear('calculated')
      }
      isCalculated = false;
    }
    intermidExt += value
    row.value = intermidExt
    if(ex[0] == 0 && nums.includes(ex[1])) ex = ex.slice(1)
    ex += value
    
  } 
  else if (operations.includes(value)) {
    if (operations.includes(ex[ex.length - 1])) {
      ex = ex.slice(0, ex.length - 1);
    }
    ex += value;
    result.value = ex;
    intermidExt = "";
  }
  if (value == 'c') {
    clear('c');
  }
  if(value == 'Backspace' || value == String.fromCharCode('8592')) {
    clear('backspace');
  }
  if (value == '=' || value == 'Enter') {
    if (!checkToMatch(ex, operations)) {
      ex = ex;
    } else if (operations.includes(ex[ex.length - 1])) {
      ex = ex;
    } else {
      let res = stringToMath(ex);
      if(isNaN(res)) {
        result.value = 'Error, enter correct expression'
        ex = 0
      }
      else {
        result.value = `${ex}=`
        ex = res
      }
      isCalculated = true;
    }
    row.value = ex;
  }
}

const stringToMath = (string) => {
  let extention = string
    .replaceAll(' ', '')
    .replaceAll('+', ' + ')
    .replaceAll('*', ' * ')
    .replaceAll('-', ' - ')
    .replaceAll('/', ' / ')
    .split(' ')

  for (let i = 0; i < extention.length; i++) {
    if (extention[i] == '') {
      extention.splice(i, 2);
      extention[i] = '-' + extention[i];
    }
  }

  let calc = document.createElement('calc');
  calc.style['opacity'] = `calc(${extention.join(' ')})`;
  let result = parseFloat(calc.style['opacity'].replace('calc(', '').replace(')', ''))
  calc.remove();

  return result;
};

const clear = (flag) => {
  if (flag == 'c') {
    row.value = "";
    result.value = "";
    intermidExt = "";
    ex = "";
  } 
  else if(flag == 'calculated') {
    row.value = "";
    result.value = "";
    intermidExt = "";
    ex = "";
  }
  else if(flag == 'backspace') {
    row.value = row.value.substring(0, row.value.length - 1);
    intermidExt = intermidExt.substring(0, intermidExt.length - 1);
    ex = ex.substring(0, ex.length - 1);
  }
};

const checkToMatch = (extention, arrOfNums) => {
  for (let i = 0; i < extention.length; i++) {
    if (arrOfNums.some((el) => el === extention[i])) {
      return true;
    }
  }
  return false;
};

const classRemove = () => {
  btn.forEach((item) => {
    item.classList.remove('active')
  })
}

const addClassToBtnOnKey = (e) => {
  classRemove()
  btn.forEach((item) => {
    if(item.innerHTML === e.key) {
      item.classList.add('active');
    }
  })
}

const addClassToBtnOnClick = (e) => {
  classRemove()
  btn.forEach((item) => {
    e.target.classList.add('active');
  })
}


btn.forEach((el) => el.addEventListener("click", show))
btn.forEach((el) => el.addEventListener('click', addClassToBtnOnClick))
document.addEventListener('keydown', show)
document.addEventListener('keydown', addClassToBtnOnKey)




