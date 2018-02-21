$(document).ready(function() {

  var entry = '';
  var currVal = '';
  var equation = [];
  var resultFound = false;

  /* Rounds the value to the nearest tenths place */
  function round(val) {
    val = val.toString();
    if(val.includes('.')) {
      return val.substring(0, val.indexOf('.')+2);
    }
    return val;
  }

  function clearAll() {
    // resets all variables
    entry = '';
    currVal = '';
    equation = [];
    $('#current-value').html(0);
    $('#equation').html(0);
  }

  function clearEntry() {
    // currVal is a number, reset to empty string
    if(currVal !== '') {
      entry = '';
      currVal = '';
      $('#current-value').html(0);
      // make sure to display 0 if all entries are cleared
      if(equation.length === 0) {
        $('#equation').html(0);
      // if not display all entries
      } else {
        $('#equation').html(equation.join(''));
      }
    } else {
      // Ensures that the equation div always displays 0
      // after all entries have been cleared
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

  /* Converts equation array to a string and uses eval to evaluate the equation */
  function getTotal() {
    return round(eval(equation.join('')));
  }

  $('button').click(function() {
    entry = $(this).val();

    // If a result was previously found, and the next entry is a digit
    // reset currVal and start a new equation
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
    // Only allows one '.'
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