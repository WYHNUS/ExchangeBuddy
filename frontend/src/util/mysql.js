export const map = (obj, fn) => {
  const rt = [];

  if (!obj || !fn || !obj.length)
    return rt;

  let i;
  for (i = 0; i < obj.length; i++)
    rt[i] = fn(obj[i]);

  return rt;
};
