export function map(obj, cbFunction) {
  let results = [];
  for(let i in obj){
    if(obj.hasOwnProperty(i)){
      results.push(cbFunction(obj[i], i));
    }
  }
  return results;
}
