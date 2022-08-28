export const logger = (store: any) => (next: any) => (action: any) => {
  console.log("store", store);
  console.log("next", next);
  console.log("action", store);
};
