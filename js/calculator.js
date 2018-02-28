$(document).ready(function() {

  var entry = '';
  var currVal = '';
  var equation = [];
  var resultFound = false;
  var isLastEntryOperator = false;

  /* Rounds the value to the nearest tenths place */
  function round(val) {
    if(val) {
      val = val.toString();
      if(val.includes('.')) {
        return val.substring(0, val.indexOf('.')+2);
      }
      return val;
    }
    return '0';
  }

  function clearAll() {
    // resets all variables
    entry = '';
    currVal = '';
    equation = [];
    resultFound = false;
    isLastEntryOperator = false;
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
        isLastEntryOperator = false;
      // if not display all entries
      } else {
        console.log('dsfjlk');
        isLastEntryOperator = true;
        $('#equation').html(equation.join(''));
      }
    } else {
      // Ensures that the equation div always displays 0
      // after all entries have been cleared
      if(equation.length <= 1) {
        equation = [];
        $('#current-value').html(0);
        $('#equation').html(0);
        isLastEntryOperator = false;
      } else {
        console.log('POP');
        isLastEntryOperator = false;
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

    // Doesn't allow user to enter a operator as a first entry
    var operators = ["+", "-", "*", "/"];
    if(equation.length === 0 && currVal === '' && operators.indexOf(entry) > -1) {
      entry = '';
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
      isLastEntryOperator = false;
      currVal += entry;
      $('#current-value').html(currVal);
      $('#equation').html(equation.join('') + currVal);
    // OPERATORS
    } else {
      if(currVal !== '0.' && !isLastEntryOperator) {
        switch(entry) {
          case '+':
          isLastEntryOperator = true;
          equation.push(currVal);
          equation.push('+');
          currVal = '';
          $('#current-value').html('+');
          $('#equation').html(equation.join(''));
          break;
          case '-':
          isLastEntryOperator = true;
          equation.push(currVal);
          equation.push('-');
          currVal = '';
          $('#current-value').html('-');
          $('#equation').html(equation.join(''));
          break;
          case '*':
          isLastEntryOperator = true;
          equation.push(currVal);
          equation.push('*');
          currVal = '';
          $('#current-value').html('*');
          $('#equation').html(equation.join(''));
          break;
          case '/':
          isLastEntryOperator = true;
          equation.push(currVal);
          equation.push('/');
          currVal = '';
          $('#current-value').html('/');
          $('#equation').html(equation.join(''));
          break;
          case '=':
          isLastEntryOperator = false;
          equation.push(currVal);
          currVal = getTotal();
          $('#current-value').html(currVal);
          if(equation[0] === '') {
            $('#equation').html(currVal + "=" + currVal);
          } else {
            $('#equation').html(equation.join('') + "=" + currVal);
          }
          equation = [];
          resultFound = true;
          break;
        }
      }
    }

    // DIGIT LIMIT CHECKER
    var check = currVal + equation.join('');
    if(check.length > 0) {
      if(currVal.split('').length > 13) {
        clearAll();
        $('#current-value').html('Digit Limit Met');
        $('#equation').html(0);
      } else if(check.split('').length > 35) {
        clearAll();
        $('#current-value').html(0);
        $('#equation').html('Digit Limit Met');
      }
    }

  });
});