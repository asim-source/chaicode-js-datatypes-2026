/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  // Your code here
  if(!Array.isArray(transactions)|| transactions.length===0) return null;
  const filteredValidTran = transactions.filter((obj)=>{
    return obj.amount>0 && (obj.type==="credit"|| obj.type==="debit");
  });
  if(filteredValidTran.length===0) return null;
  const totalCrediting = filteredValidTran.reduce((sum ,creditObj)=>{
    if(creditObj.type==="credit"){
     sum = sum+creditObj.amount; 
    }
    return sum;
  },0);
  const totalDebiting = filteredValidTran.reduce((acc,debitObj)=>{
    if(debitObj.type==="debit"){
      acc = acc+debitObj.amount;
    }
    return acc;
  },0);
  
  const netBalancing = totalCrediting-totalDebiting;
  // console.log(netBalancing);
  const validTranCount = filteredValidTran.length;
  // console.log(validTranCount);
  const avgTransacting = Math.round((totalCrediting+totalDebiting)/validTranCount);

  const maping = filteredValidTran.map((currentObj)=>{
    return currentObj.amount;
  });
  console.log(maping);
  const highestTransacting = filteredValidTran.find((cObj)=>{
    return cObj.amount===Math.max(...maping);
  });

  const everyUseCase = filteredValidTran.every((evObj)=>{
    return evObj.amount>100;
  });
  // console.log(everyUseCase);
  const hasLargeTransacting = filteredValidTran.some((sObj)=>{
    return sObj.amount>=5000;
  });
  const categoryBreaking = filteredValidTran.reduce((accumulate,categoryObj)=>{
    const category = categoryObj.category;
    if(accumulate[category]===undefined){
      accumulate[category] = categoryObj.amount;
    }else{
      accumulate[category] = accumulate[category]+categoryObj.amount;   
     }
    return accumulate;
  },{});

  const frequentObj = filteredValidTran.reduce((acc,currentTransaction)=>{
    const toKey = currentTransaction.to;
    if(acc[toKey]===undefined){
      acc[toKey] = 1;
    }else{
      acc[toKey] = acc[toKey] + 1;
    }
    return acc;


  },{});
  let varWinner;
  let max = 0;
   for(const variableKey of Object.keys(frequentObj)){
    let keyStore = variableKey;
    let currentCount = frequentObj[variableKey];
    if(currentCount>max){
      max = currentCount;
      varWinner = keyStore;
    }
   } 

   
   
  return {totalCredit:totalCrediting,totalDebit:totalDebiting,netBalance:netBalancing,transactionCount:validTranCount,avgTransaction:avgTransacting,highestTransaction:highestTransacting,categoryBreakdown:categoryBreaking,frequentContact:varWinner,allAbove100:everyUseCase,hasLargeTransaction:hasLargeTransacting};







}
 console.log(analyzeUPITransactions([
      { id: "T1", type: "credit", amount: 30, to: "Salary", category: "income", date: "2025-01-01" },
      { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
      { id: "T3", type: "debit", amount: 10, to: "Swiggy", category: "food", date: "2025-01-03" },
      { id: "T3", type: "debit", amount: 10, to: "Swiggy", category: "food", date: "2025-01-03" }
   ]));