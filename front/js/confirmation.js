let order = document.getElementById('orderId');
let params = window.location.search;
params = params.slice(4, params.length);

order.innerText = params;

console.log(params)