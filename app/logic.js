// js program to find maximum cash flow among a set of persons   

//utils
function indexOfMax(arr) {
  var maxIndex = 0;
  for (let i = 1; i < N; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }
  return maxIndex;
}

function indexOfMin(arr) {
  var minIndex = 0;
  for (let i = 1; i < N; i++) {
    if (arr[i] < arr[minIndex]) {
      minIndex = i;
    }
  }
  return minIndex;
}

function minOf2(x, y) {
  return (x < y) ? x : y;
}

// [w -> c, w -> a, c -> w, c -> a, a -> w, a -> c]
let result = [0, 0, 0, 0, 0, 0]

// number of persons (or vertices in the graph)
var N = 3;
    
// amount[p] indicates the net amount to be credited/debited to/from person 'p'
// If amount[p] is positive, then i'th person will get amount[i]
// If amount[p] is negative, then i'th person will give amount[i]
function minCashFlowRecursion(amount) {
  // Find the indices of minimum and maximum values in amount
  // amount[maxCredit] indicates the maximum amount to be given (or credited) to any person
  // amount[maxDebit] indicates the maximum amount to be taken (or debited) from any person
  // If there is a positive value in amount, then there must be a negative value
  var maxCredit = indexOfMax(amount);
  var maxDebit = indexOfMin(amount);

  // Find the minimum of two amounts
  var min = minOf2(-amount[maxDebit], amount[maxCredit]);
  amount[maxCredit] -= min;
  amount[maxDebit] += min;

  // console.log("<br>Person " + maxDebit + " pays " + min + " to " + "Person " + maxCredit);

  // [w -> c, w -> a, c -> w, c -> a, a -> w, a -> c]
  if (maxDebit == 0 && maxCredit == 1) {
    result[0] = Math.round(min)
  } else if (maxDebit == 0 && maxCredit == 2) {
    result[1] = Math.round(min)
  } else if (maxDebit == 1 && maxCredit == 0) {
    result[2] = Math.round(min)
  } else if (maxDebit == 1 && maxCredit == 2) {
    result[3] = Math.round(min)
  } else if (maxDebit == 2 && maxCredit == 1) {
    result[4] = Math.round(min)
  } else if (maxDebit == 2 && maxCredit == 1) {
    result[5] = Math.round(min)
  }

  console.log(amount[maxCredit])
  console.log(amount[maxDebit])

  // If both amounts are within threshold of 0, then all debts are settled
  if (Math.abs(amount[maxCredit]) < 0.5 && Math.abs(amount[maxDebit]) < 0.5) {
    console.log('res')
    console.log(result)
    return;
  }
  // Recursion with new amount, will terminate as either amount[maxCredit] or amount[maxDebit] gets close to 0
  minCashFlowRecursion(amount);
}

// Given a set of persons as graph where graph[i][j] indicates the amount that person i needs to 
// pay person j, this function finds and prints the minimum cash flow to settle all debts
export function minCashFlow(graph) {
  // Create an array called amount, initialize all values as 0
  var amount = Array.from({length: N}, (_, i) => 0);

  // Calculate the net amount to be paid to person 'p', and stores it in amount[p]. The 
  // value of amount[p] can be calculated by subtracting debts of 'p' from credits of 'p'
  for (let p = 0; p < N; p++) {
    for (let i = 0; i < N; i++) {
      amount[p] += (graph[i][p] - graph[p][i]);
    }
  }
  
  minCashFlowRecursion(amount);

  return result;
}