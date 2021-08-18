type Object = {
  [key: string]: string | Number | boolean;
};

export const removeDuplicateObjectFromArray = <T extends Object>(
  array: T[],
  key: string
): T[] => {
  var check = new Set();
  return array.filter(
    (obj: Object) => !check.has(obj[key]) && check.add(obj[key])
  );
};
