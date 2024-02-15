//IDENTIFICAR QUE EL USUARIO YA ESTA LOGEADO
export const setItem = (data: any, item: string) => {
  localStorage.setItem(item, JSON.stringify(data));
};
export const getItem = (item: string): any => {
  const value = localStorage.getItem(item);
 // console.log(value);
  return value !== null ? String(value) : "";
};
