/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
  let grading;
  let charat;
  let passedSubArray;
  if(typeof student!=="object" || student===null) return null;
  if(typeof student.name!=="string" ||  student.name.length===0) return null;
  if(typeof student.marks!=="object" || student.marks===null || Object.keys(student.marks).length===0) return null;
  const arrayMarks = Object.values(student.marks);
  const NoOfSubject = arrayMarks.length;
  
  const booleans = arrayMarks.every((mark) => {
    return (mark>=0 && mark<=100 && Number.isFinite(mark));
  });
  if(booleans===false) return null;
  const totalMarksHai = arrayMarks.reduce((acc,val)=>{
    return acc+val;
  },0)
  const percentageHai = (totalMarksHai/(NoOfSubject*100))*100;
  const decimal2percentage = parseFloat(percentageHai.toFixed(2));
  if(decimal2percentage>=90 && decimal2percentage<100){
    grading="A+";
  }else if(decimal2percentage>=80){
    grading="A";
  }else if(decimal2percentage>=70){
    grading="B";
  }else if(decimal2percentage>=60){
    grading="C";
  }else if(decimal2percentage>=40){
    grading="D";
  }else{
    grading="F";
  }
  const highSub = Object.entries(student.marks);
  const NO = Object.values(student.marks);
  const highestMaxSub = Math.max(...NO);
  const findInnerArray = highSub.find((innerarray)=>{
   return innerarray[1]===highestMaxSub;
  })
  const highestMarkSubject = findInnerArray[0];
  const minSubjectMarks = Math.min(...NO);
  const finalInnerArray = highSub.find((minArray) =>{
    return minArray[1]===minSubjectMarks;
  })
  const lowSubMarks = finalInnerArray[0];

  const filterPassedSubject = highSub.filter((internalArray) =>{
    return internalArray[1]>=40;
    });
    
    const passedSubFinalArray = filterPassedSubject.map((ele)=>{
      return ele[0];
    })
    const filterfailedArray = highSub.filter((value)=>{
      return value[1]<40;
    })
    const finalFailArray = filterfailedArray.map((khudi)=>{
      return khudi[0];
    });
  
    return {name:student.name,totalMarks:totalMarksHai,percentage:decimal2percentage,grade:grading,highestSubject:highestMarkSubject,lowestSubject:lowSubMarks,passedSubjects:passedSubFinalArray,failedSubjects:finalFailArray,subjectCount:NoOfSubject};

}
generateReportCard({ name: "Rahul", marks: { maths: 97, science: 99, english:31, } });
