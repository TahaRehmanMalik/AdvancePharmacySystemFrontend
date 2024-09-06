
export function createOrder(order) {
  return new Promise(async(resolve) =>{
    const response=await fetch('/orders',{
      method:"POST",
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  
  );
}
export function updateOrder(order) {
  return new Promise(async(resolve) =>{
    const response=await fetch('/orders/'+order.id,{
      method:"PATCH",
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  
  );
}
export function fetchAllOrders(pagination) {
  let queryString='';
  for(let key in pagination)
  {
    queryString +=`${key}=${pagination[key]}&`;
  }
  console.log("the queryString Value is",queryString)
  return new Promise(async(resolve) =>{
    const response=await fetch('/orders?'+queryString);
    const data=await response.json();
    console.log("the data is ",data);
    const totalOrders=await response.headers.get('X-Total-Count');
    resolve({data:{orders:data,totalOrders: +totalOrders}});
  }
  
  );
}
export function fetchAllDeliveredOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch('/orders'); 
    const totalDeliveredCount = await response.headers.get('X-Total-Count');
    const data = await response.json();
    resolve({ data: { totalDeliveredCount, ...data } });
  });
}