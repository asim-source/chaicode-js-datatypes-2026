/**
 * 🧾 GST Calculator - Tax Lagao Bhai!
 *
 * Bunty apni dukaan ke liye GST calculator bana raha hai. Customer ko bill
 * dena hai jisme base price, GST amount, aur total clearly dikhna chahiye.
 * GST rate category ke hisaab se change hota hai.
 *
 * GST Rates (by category string, case-insensitive):
 *   - "essential"   => 0% GST  (dal, chawal, atta, etc.)
 *   - "food"        => 5% GST  (packaged food, restaurant below Rs 7500)
 *   - "standard"    => 12% GST (processed food, business class tickets)
 *   - "electronics" => 18% GST (phones, laptops, etc.)
 *   - "luxury"      => 28% GST (cars, aerated drinks, tobacco)
 *   - Any other category => return null
 *
 * Rules:
 *   - Calculate: gstAmount = amount * rate / 100
 *   - Calculate: totalAmount = amount + gstAmount
 *   - Round gstAmount aur totalAmount to 2 decimal places using
 *     parseFloat(value.toFixed(2))
 *   - Return object: { baseAmount, gstRate, gstAmount, totalAmount }
 *   - category ko lowercase mein compare karo (case-insensitive)
 *   - Hint: Use toFixed(), parseFloat(), Number.isFinite(), toLowerCase()
 *
 * Validation:
 *   - Agar amount positive finite number nahi hai, return null
 *   - Agar category string nahi hai, return null
 *   - Agar category unknown hai, return null
 *
 * @param {number} amount - Base amount before tax
 * @param {string} category - Product category
 * @returns {{ baseAmount: number, gstRate: number, gstAmount: number, totalAmount: number } | null}
 *
 * @example
 *   calculateGST(1000, "electronics")
 *   // => { baseAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 }
 *
 *   calculateGST(500, "essential")
 *   // => { baseAmount: 500, gstRate: 0, gstAmount: 0, totalAmount: 500 }
 */
export function calculateGST(amount, category) {
  // Your code here
  let rating,findgstAmount,findTotalAmount;
  const categoryArray = ["standard", "electronics", "luxury", "food", "essential"];
  if(typeof category!=="string") return null;
  const categoryLower = category.toLowerCase();
  if(!Number.isFinite(amount) || amount<=0) return null;
  if(!categoryArray.includes(categoryLower)) return null;
  
  if(categoryLower==="essential"){
    rating = 0
    findgstAmount= amount*rating/100;
    findTotalAmount = amount + findgstAmount;

  }else if(categoryLower==="food"){
    rating = 5
    findgstAmount= amount*rating/100;
    findTotalAmount = amount + findgstAmount;
  }else if(categoryLower==="standard"){
    rating = 12;
    findgstAmount= amount*rating/100;
    findTotalAmount = amount + findgstAmount;
  }else if(categoryLower==="electronics"){
    rating = 18;
    findgstAmount= amount*rating/100;
    findTotalAmount = amount + findgstAmount;
  }else if(categoryLower==="luxury"){
    rating = 28
    findgstAmount= amount*rating/100;
    findTotalAmount = amount + findgstAmount;
  }

  const finalGstAmount = parseFloat(findgstAmount.toFixed(2));
  const finalTotalAmount = parseFloat(findTotalAmount.toFixed(2));
  return{baseAmount:amount,gstRate:rating,gstAmount:finalGstAmount,totalAmount:finalTotalAmount};
}
console.log( calculateGST(967, "electronics"));