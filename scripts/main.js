$(document).ready(function(){

  var digit = [];
  var digitStr;
  var displayDigit = [];
  var operators = [];
  var x, c, o; //result, operator code, operator
  var screen;

function display(){
    displayDigit = digitStr.split(/[*/+-]/);
    for(var i = 0; i < displayDigit.length; i++){
      screen = displayDigit[i];
    };
  $("#main").text(screen);
};

  function point(){    //having just one point sign
     if(digitStr.match(/[*/+-]?\d*\.\d*$/)){
      return;
    }else{
      digit.push(".");
    }
  };

function operations(e){
  if(digitStr.length === 0 && e.which === c){
    e.preventDefault();//preventing operators to be entered at the beginning
  }else if(digitStr.match(/\d*[*/+-]$/)){
     return;
    }else{
      digit.push(o);
      }
}

  function result(){
      operators = digitStr.split(/\d*\.?\d*/);
    for(var j = displayDigit.length-1; j > 0; j--){//looping from the end, because splice method did not do well with the looping from the begining
   var a = (displayDigit[0])-0;
   var b = (displayDigit[1])-0;

        if(operators[1]==="+"){
          x = a+b;
        }else if(operators[1]==="-"){
          x = a-b;
        }else if(operators[1]==="*"){
          x = a*b;
        }else{
          x = a/b;
        }

   //screen = x.toPrecision(10).replace(/0+$/, ""); //fix zeros in floating numbers but it displays wierd point sign at the end of the integer
   screen = +x.toFix(10);
         displayDigit.splice(0,2,x);//exchange first two elements (numbers) of the array with their result
         operators.splice(1,1);  //next operator...
    };
    $("#main").text(screen);
  };

  $(".btn").on("click",function(){
      switch(this.id){
        case "one": digit.push(1);
        break;
        case "two": digit.push(2);
        break;
        case "three": digit.push(3);
        break;
        case "four": digit.push(4);
        break;
        case "five": digit.push(5);
        break;
        case "six": digit.push(6);
        break;
        case "seven": digit.push(7);
        break;
        case "eight": digit.push(8);
        break;
        case "nine": digit.push(9);
        break;
        case "zero": digit.push(0);
        break;
        case "point": point();
        break;
        case "add": c = 43;
                    o = "+";
                    operations();
        break;
        case "subtract": c = 45;
                         o = "-";
                         operations();
        break;
        case "multiply":  c = 42;
                          o = "*";
                          operations();
        break;
        case "divide": c = 47;
                       o = "/";
                       operations();
        break;
        case "ce": digit.pop();
        break;
        case "clear": digit = [];
        break;
        case "equal": result();
          return;
               };

       digitStr = digit.join("");

    $("#second").text(digitStr);

       display();
   });
});
