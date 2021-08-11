function pairs(items) {
  //debugger;
  let _pairs = [];
  if (items.length >= 2) {
    
  for (let i = 0; i < items.length; i++) {
      for (let j = i; j < items.length; j++) {
        if (i != j) {
          _pairs.push([items[i], items[j]]);
        }
      }
    }
  }
   return _pairs;
}
