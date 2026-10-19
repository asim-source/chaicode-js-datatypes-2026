/**
 * 🚂 Indian Railway PNR Status System
 *
 * IRCTC ka PNR status system bana! PNR data milega with train info,
 * passengers, aur current statuses. Tujhe ek complete status report
 * generate karna hai with formatted output aur analytics.
 *
 * pnrData object:
 *   {
 *     pnr: "1234567890",
 *     train: { number: "12301", name: "Rajdhani Express", from: "NDLS", to: "HWH" },
 *     classBooked: "3A",
 *     passengers: [
 *       { name: "Rahul Kumar", age: 28, gender: "M", booking: "B1", current: "B1" },
 *       { name: "Priya Sharma", age: 25, gender: "F", booking: "WL5", current: "B3" },
 *       { name: "Amit Singh", age: 60, gender: "M", booking: "WL12", current: "WL8" }
 *     ]
 *   }
 *
 * Status rules (based on current field):
 *   - Starts with "B" or "S" (berth/seat) => status = "CONFIRMED"
 *   - Starts with "WL" => status = "WAITING"
 *   - Equals "CAN" => status = "CANCELLED"
 *   - Starts with "RAC" => status = "RAC"
 *
 * For each passenger generate:
 *   - formattedName: name.padEnd(20) + "(" + age + "/" + gender + ")"
 *   - bookingStatus: booking field value
 *   - currentStatus: current field value
 *   - statusLabel: one of "CONFIRMED", "WAITING", "CANCELLED", "RAC"
 *   - isConfirmed: boolean (true only if statusLabel === "CONFIRMED")
 *
 * Summary (use array methods on processed passengers):
 *   - totalPassengers: count of passengers
 *   - confirmed: count of CONFIRMED
 *   - waiting: count of WAITING
 *   - cancelled: count of CANCELLED
 *   - rac: count of RAC
 *   - allConfirmed: boolean - every passenger confirmed? (use every)
 *   - anyWaiting: boolean - some passenger waiting? (use some)
 *
 * Other fields:
 *   - chartPrepared: true if every NON-CANCELLED passenger is confirmed
 *   - pnrFormatted: "123-456-7890" (3-3-4 dash pattern, use slice + join or concatenation)
 *   - trainInfo: template literal =>
 *     "Train: {number} - {name} | {from} → {to} | Class: {classBooked}"
 *
 * Hint: Use padEnd(), slice(), join(), map(), filter(), every(), some(),
 *   startsWith(), template literals, typeof, Array.isArray()
 *
 * Validation:
 *   - Agar pnrData object nahi hai ya null hai, return null
 *   - Agar pnr string nahi hai ya exactly 10 digits nahi hai, return null
 *   - Agar train object missing hai, return null
 *   - Agar passengers array nahi hai ya empty hai, return null
 *
 * @param {object} pnrData - PNR data object
 * @returns {{ pnrFormatted: string, trainInfo: string, passengers: Array<{ formattedName: string, bookingStatus: string, currentStatus: string, statusLabel: string, isConfirmed: boolean }>, summary: { totalPassengers: number, confirmed: number, waiting: number, cancelled: number, rac: number, allConfirmed: boolean, anyWaiting: boolean }, chartPrepared: boolean } | null}
 *
 * @example
 *   processRailwayPNR({
 *     pnr: "1234567890",
 *     train: { number: "12301", name: "Rajdhani Express", from: "NDLS", to: "HWH" },
 *     classBooked: "3A",
 *     passengers: [
 *       { name: "Rahul", age: 28, gender: "M", booking: "B1", current: "B1" }
 *     ]
 *   })
 *   // => { pnrFormatted: "123-456-7890",
 *   //      trainInfo: "Train: 12301 - Rajdhani Express | NDLS → HWH | Class: 3A",
 *   //      passengers: [...], summary: { ..., allConfirmed: true }, chartPrepared: true }
 */
export function processRailwayPNR(pnrData) {
 let statusLabeling,isConfirming;
 let formattingName,bookSt,currentSt;
 
 if(typeof pnrData!=="object" || pnrData===null) return null;
 if(typeof pnrData.pnr!=="string" || pnrData.pnr.length!==10 || !/^[0-9]+$/.test(pnrData.pnr)) return null;
 if(pnrData.train===undefined) return null;
 if(!Array.isArray(pnrData.passengers) || pnrData.passengers.length===0) return null;
 
 const first3 = pnrData.pnr.slice(0,3);
 const mid4 = pnrData.pnr.slice(3,6);
 const end4= pnrData.pnr.slice(6);
 const finalPnr = first3+"-"+mid4+"-"+end4;

const trainInformation = `Train: ${pnrData.train.number} - ${pnrData.train.name} | ${pnrData.train.from} → ${pnrData.train.to} | Class: ${pnrData.classBooked}`;
const maping = pnrData.passengers.map((currentfield)=>{
formattingName = `${currentfield.name.padEnd(20," ")}(${currentfield.age}/${currentfield.gender})`;
bookSt = currentfield.booking;
currentSt = currentfield.current;
if(currentfield.current.startsWith("B") || currentfield.current.startsWith("S")){
    statusLabeling = "CONFIRMED";
}else if(currentfield.current.startsWith("WL")){
    statusLabeling = "WAITING";
}else if(currentfield.current.startsWith("CAN")){
    statusLabeling = "CANCELLED";
}else if(currentfield.current.startsWith("RAC")){
    statusLabeling = "RAC";
}
if(statusLabeling==="CONFIRMED"){
    isConfirming = true;
}else{
    isConfirming = false;
}
return{
    formattedName:formattingName,
    bookingStatus:bookSt,
    currentStatus:currentSt,
    statusLabel:statusLabeling,
    isConfirmed:isConfirming,
}
});
// console.log(maping);
const counting = maping.filter((passengersElement)=>{
    return passengersElement;
});
const passengerCount = counting.length;
// console.log(passengerCount);

const accCount = maping.reduce((acc,currentStatus)=>{
    let countStatusLabel = currentStatus.statusLabel;
    if( acc[countStatusLabel]===undefined){
        acc[countStatusLabel] = 1;
        
    }else {
         acc[countStatusLabel] =  acc[countStatusLabel] +1;
    }
    return acc;
},{
  CONFIRMED :0,
  CANCELLED :0,
  WAITING :0,
  RAC     :0,
});

const allConfirming = maping.every((currentObj)=>{
    return currentObj.statusLabel==="CONFIRMED";
});
const anyWait = maping.some((curObj)=>{
    return curObj.statusLabel==="WAITING";
});

const filteredNonCancelled = maping.filter((currentStatus) =>{
 return currentStatus.statusLabel!=="CANCELLED";
});
const chartPreparing = filteredNonCancelled.every((currentObj)=>{
    return currentObj.statusLabel==="CONFIRMED";
})


return {pnrFormatted:finalPnr,trainInfo:trainInformation,passengers:maping,summary:{totalPassengers:passengerCount,confirmed:accCount.CONFIRMED,waiting:accCount.WAITING,cancelled:accCount.CANCELLED,rac:accCount.RAC,allConfirmed:allConfirming,anyWaiting:anyWait},chartPrepared:chartPreparing};
}


