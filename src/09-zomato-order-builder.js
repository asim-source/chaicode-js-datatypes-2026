/**
 * 🍕 Zomato Order Builder
 *
 * Zomato jaisa order summary banana hai! Cart mein items hain (with quantity
 * aur addons), ek optional coupon code hai, aur tujhe final bill banana hai
 * with itemwise breakdown, taxes, delivery fee, aur discount.
 *
 * Rules:
 *   - cart is array of items:
 *     [{ name: "Butter Chicken", price: 350, qty: 2, addons: ["Extra Butter:50", "Naan:40"] }, ...]
 *   - Each addon string format: "AddonName:Price" (split by ":" to get price)
 *   - Per item total = (price + sum of addon prices) * qty
 *   - Calculate:
 *     - items: array of { name, qty, basePrice, addonTotal, itemTotal }
 *     - subtotal: sum of all itemTotals
 *     - deliveryFee: Rs 30 if subtotal < 500, Rs 15 if 500-999, FREE (0) if >= 1000
 *     - gst: 5% of subtotal, rounded to 2 decimal places parseFloat(val.toFixed(2))
 *     - discount: based on coupon (see below)
 *     - grandTotal: subtotal + deliveryFee + gst - discount (minimum 0, use Math.max)
 *     - Round grandTotal to 2 decimal places
 *
 *   Coupon codes (case-insensitive):
 *     - "FIRST50"  => 50% off subtotal, max Rs 150 (use Math.min)
 *     - "FLAT100"  => flat Rs 100 off
 *     - "FREESHIP" => delivery fee becomes 0 (discount = original delivery fee value)
 *     - null/undefined/invalid string => no discount (0)
 *
 *   - Items with qty <= 0 ko skip karo
 *   - Hint: Use map(), reduce(), filter(), split(), parseFloat(),
 *     toFixed(), Math.max(), Math.min(), toLowerCase()
 *
 * Validation:
 *   - Agar cart array nahi hai ya empty hai, return null
 *
 * @param {Array<{ name: string, price: number, qty: number, addons?: string[] }>} cart
 * @param {string} [coupon] - Optional coupon code
 * @returns {{ items: Array<{ name: string, qty: number, basePrice: number, addonTotal: number, itemTotal: number }>, subtotal: number, deliveryFee: number, gst: number, discount: number, grandTotal: number } | null}
 *
 * @example
 *   buildZomatoOrder([{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }], "FLAT100")
 *   // subtotal: 330, deliveryFee: 30, gst: 16.5, discount: 100
 *   // grandTotal: 330 + 30 + 16.5 - 100 = 276.5
 *
 *   buildZomatoOrder([{ name: "Pizza", price: 500, qty: 2, addons: [] }], "FIRST50")
 *   // subtotal: 1000, deliveryFee: 0, gst: 50, discount: min(500, 150) = 150
 *   // grandTotal: 1000 + 0 + 50 - 150 = 900
 */
export function buildZomatoOrder(cart, coupon) {
  // Your code here
  if (!Array.isArray(cart) || cart.length === 0) return null;
  let caldeliveryFee;
  let calDiscount;
  const filteredArray = cart.filter((c) => {
    return c.qty > 0;
  });

  const calObjDetails = filteredArray.map((n) => {
    let totalAddon;
    if(!n.addons){
      totalAddon =0;
    }
    else{
      totalAddon = 0;
      const currentAddonArray = n.addons;
      for (const variable of currentAddonArray) {
      const pricingAddon = variable.split(":");
      const tempAddon = Number(pricingAddon[1]);
      totalAddon = totalAddon + tempAddon;
    }
    }
    
    return {
      name: n.name,
      qty: n.qty,
      basePrice: n.price,
      addonTotal: totalAddon,
      itemTotal: (n.price + totalAddon) * n.qty,
    };
  });
  const calSubtotal = calObjDetails.reduce((acc, total) => {
    return acc + total.itemTotal;
  }, 0);
  if (calSubtotal < 500) {
    caldeliveryFee = 30;
  } else if (calSubtotal >= 500 && calSubtotal <= 999) {
    caldeliveryFee = 15;
  } else {
    caldeliveryFee = 0;
  }
  const tempGst = calSubtotal * 0.05;
  const calGst =Number(parseFloat(tempGst.toFixed(2)));

  if (
    coupon === null ||
    coupon === undefined ||
    typeof coupon !== "string" ||
    coupon.length === 0
  ) {
    calDiscount = 0;
  } else {
    if (coupon.toLowerCase() === "FIRST50".toLowerCase()) {
      const calDSubtotal = calSubtotal * 0.5;
      calDiscount = Math.min(calDSubtotal, 150);
    } else if (coupon.toLowerCase() === "FLAT100".toLowerCase()) {
      calDiscount = 100;
    } else if (coupon.toLowerCase() === "FREESHIP".toLowerCase()) {
      calDiscount = caldeliveryFee;
      caldeliveryFee = 0
    } else {
      calDiscount = 0;
    }
  }

  const grandT = calSubtotal + caldeliveryFee + calGst - calDiscount;
  const grandTotal = Number(grandT.toFixed(2));
  const grandFinalTotal = Math.max(grandTotal,0);
  

  return {
    items: calObjDetails,
    subtotal: calSubtotal,
    deliveryFee: caldeliveryFee,
    gst: calGst,
    discount: calDiscount,
    grandTotal: grandFinalTotal,
  };
}

console.log(
  buildZomatoOrder(
    [
      {
        name: "Biryani",
        price: 300,
        qty: 2,
        addons: ["Raita:30", "Naan:40", "Dahi:30"],
      },
      { name: "Pizza", price: 500, qty: 3, addons: ["sauce:50", "cream:10"] },
    ],
    "FIRST50",
  ),
);

