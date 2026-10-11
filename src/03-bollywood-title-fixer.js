/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
  // Your code here
  let charIE;
  let sliceIERest;
  let concatIE;
  let elementLower;
  
  let sliceNIERest;
  
  let lastchar,lastslice,lastconcat;
  
  
  
  if(typeof title!=="string" ||title.trim()==="" )return "";
  const newTitle = title.trim().replace(/\s+/g," ");
  const array = newTitle.split(" ");
  // console.log(array);
  const ExceptionArray = ["ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"];
  // console.log(ExceptionArray);

  const titleCase = array.map((element,indexing) => {
    elementLower = element.toLowerCase();
    if(indexing===0 &&  ExceptionArray.includes(elementLower)){
      charIE = elementLower.charAt(0).toUpperCase();
      sliceIERest = elementLower.slice(1).toLowerCase();
      concatIE = charIE.concat(sliceIERest);
      return concatIE;
    }
    else if(ExceptionArray.includes(elementLower)){
      sliceNIERest = elementLower.toLowerCase();
      return sliceNIERest;
    }else{
      lastchar = elementLower.charAt(0).toUpperCase();
      lastslice= elementLower.slice(1).toLowerCase();
      lastconcat = lastchar.concat(lastslice);
      return lastconcat;
    }
 }).join(" ");
  
 
 
 return titleCase ;
 
  
  
  
  
}
 console.log(fixBollywoodTitle("dil ka kya kare"));