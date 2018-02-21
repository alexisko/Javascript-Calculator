$(document).ready(function() {

  var entry = '';
  var currVal = '';
  var equation = [];
  var resultFound = false;

  /* Rounds the value to the nearest hundreths place */
  function round(val) {

  }

  function clearAll() {
    entry = '';
    currVal = '';
    equation = [];
    $('#current-value').html(0);
    $('#equation').html(0);
  }

  function clearEntry() {
    if(currVal !== '') {
      entry = '';
      currVal = '';
      $('#current-value').html(0);
      if(equation.length === 0) {
        $('#equation').html(0);
      } else {
        $('#equation').html(equation.join(''));
      }
    } else {
      if(equation.length <= 1) {
        equation = [];
        $('#current-value').html(0);
        $('#equation').html(0);
      } else {
        equation.pop();
        currVal = '';
        $('#current-value').html(0);
        $('#equation').html(equation.join(''));
      }
    }
  }

  function getTotal() {
    return eval(equation.join('')).toString();
  }

  $('button').click(function() {
    entry = $(this).val();

    if(resultFound && /\d/g.test(entry)) {
      currVal = '';
    }
    resultFound = false;

    // CLEAR ALL
    if(entry === 'AC') {
      clearAll();
    // CLEAR ENTRY
    } else if(entry === 'CE') {
      clearEntry();
    // DECIMAL
    } else if(entry === '.') {
      // If the current value is empty
      if(currVal === '') {
        currVal = '0.';
        $('#current-value').html(currVal);
        $('#equation').html(equation.join('') + currVal);
      // If '.' does not exist in the current value add it
      } else if(!currVal.includes('.')) {
        currVal += '.';
        $('#current-value').html(currVal);
        $('#equation').html(equation.join('') + currVal);
      }
    // DIGITS
    } else if(/\d/g.test(entry)) {
      currVal += entry;
      $('#current-value').html(currVal);
      $('#equation').html(equation.join('') + currVal);
    // OPERATORS
    } else {
      if(currVal !== '0.') {
        switch(entry) {
          case '+':
          equation.push(currVal);
          equation.push('+');
          console.log("add " + equation);
          currVal = '';
          $('#current-value').html('+');
          $('#equation').html(equation.join(''));
          break;
          case '-':
          equation.push(currVal);
          equation.push('-');
          currVal = '';
          $('#current-value').html('-');
          $('#equation').html(equation.join(''));
          break;
          case '*':
          equation.push(currVal);
          equation.push('*');
          currVal = '';
          $('#current-value').html('*');
          $('#equation').html(equation.join(''));
          break;
          case '/':
          equation.push(currVal);
          equation.push('/');
          currVal = '';
          $('#current-value').html('/');
          $('#equation').html(equation.join(''));
          break;
          case '=':
          equation.push(currVal);
          currVal = getTotal();
          $('#current-value').html(currVal);
          $('#equation').html(equation.join('') + "=" + currVal);
          equation = [];
          resultFound = true;
          break;
        }
      }
    }
  });
});