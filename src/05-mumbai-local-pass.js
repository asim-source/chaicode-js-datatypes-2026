/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  // Your code here
  // let first,second;
  if (typeof passenger !== "object" || passenger === null)
    return "INVALID PASS";
  const classTypeArray = ["first", "second"];
  if (!classTypeArray.includes(passenger.classType.toLowerCase()))
    return "INVALID PASS";
  for (const value of Object.values(passenger)) {
    if (value === "") return "INVALID PASS";
  }
  const keys = ["name", "from", "to", "classType"];
  const missingOrNot = keys.every((val) => {
    return Object.keys(passenger).includes(val);
  });
  if (missingOrNot === true) {
  } else {
    return "INVALID PASS";
  }
  let passClassType = passenger.classType.charAt(0).toUpperCase();
  let passFrom = passenger.from.slice(0, 3).toUpperCase();
  let passTo = passenger.to.slice(0, 3).toUpperCase();
  const finalPassId = passClassType.concat(passFrom, passTo);

  let titleFrom1 = passenger.from.charAt(0).toUpperCase();
  let titleFrom2 = passenger.from.slice(1).toLowerCase();
  const finalTitleFrom = titleFrom1.concat(titleFrom2);
  let titleTo1 = passenger.to.charAt(0).toUpperCase();
  let titleTo2 = passenger.to.slice(1).toLowerCase();
  const finalTitleTo = titleTo1.concat(titleTo2);

  return`MUMBAI LOCAL PASS\n---\nName: ${passenger.name.toUpperCase()}\nFrom: ${finalTitleFrom}\nTo: ${finalTitleTo}\nClass: ${passenger.classType.toUpperCase()}\nPass ID: ${finalPassId}`


}


