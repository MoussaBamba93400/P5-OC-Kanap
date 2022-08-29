let prix = 0;
let totalProduct = 0;
let myList = JSON.parse(localStorage.getItem('myList'))

for( let i = 0;  myList.length > 0 && i < myList.length ; i++) {
    let data = myList[i]

   console.log(data)
   prix += data[4] * data[1]
   totalProduct += data[1]

    // create DOM Elements
    let article = document.createElement('article');

    // set the attribute for the color and the id
    article.setAttribute('data-id', data[0]);  
    article.setAttribute('data-color', data[2])

    article.className = "cart__item"

    let cartImg = document.createElement('div');
    let img = document.createElement('img');

    img.setAttribute('src', data[3])
    cartImg.className = "cart__item__img";

    let cartItemContent = document.createElement('div');
    cartItemContent.className = "cart__item__content";

    let cartDescription = document.createElement('div');
    cartDescription.className = "cart__item__content__description";

    let cartSetting = document.createElement('div');
    cartSetting.className = "cart__item__content__settings";

    let cartSettingQuantity = document.createElement('div');
    cartSettingQuantity.className = "cart__item__content__settings__quantity"

    let cartDelete = document.createElement('div');
    cartDelete.className = "cart__item__content__settings__delete";


    let input = document.createElement('input');
    input.setAttribute("class" ,"itemQuantity");
    input.setAttribute('type', "number");
    input.setAttribute('name', "itemQuantity");
    input.setAttribute('min', "1");
    input.setAttribute('max', "100");
    input.setAttribute('value', `${data[1]}`);

    let heading = document.createElement('h2');
    heading.innerText = data[5]

    let color = document.createElement('p');
    color.innerText = data[2];

    let price = document.createElement('p');
    price.innerText = `${data[4]} €`

    let quantity = document.createElement('p');
    quantity.innerText =  "Qté : "

    let Delete = document.createElement('p');
    Delete.className = "deleteItem";
    Delete.innerText = "Supprimer"





    cartItemContent.appendChild(cartDescription);
    cartItemContent.appendChild(cartSetting)

    cartDescription.appendChild(heading);
    cartDescription.appendChild(color);
    cartDescription.appendChild(price);



    cartSettingQuantity.appendChild(quantity);
    cartSettingQuantity.appendChild(input);

    cartDelete.appendChild(Delete);

    cartSetting.appendChild(cartSettingQuantity);
    cartSetting.appendChild(cartDelete);



    cartImg.appendChild(img);
    article.appendChild(cartImg);
    article.appendChild(cartItemContent);

    document.getElementById('cart__items').appendChild(article)
    

   
}



document.getElementById('totalQuantity').innerText = totalProduct;
document.getElementById('totalPrice').innerText = prix;

const inputs = document.querySelectorAll('.itemQuantity');

inputs.forEach(input => {
    input.addEventListener('change', (e) => {
        let id = e.path[4].dataset.id;
        let color = e.path[4].dataset.color;
        let newValue = e.target.value;
        console.log(id)
        console.log(color)
        console.log(newValue)


        for(let i = 0; i < myList.length; i++) {
            let arr = myList[i];
            if(arr[0] === id && arr[2] === color) {
                arr[1] = newValue;
                myList[i] = arr;

                return  localStorage.setItem("myList", JSON.stringify(myList));

            } 
            
         }
    })
})


const deleteButtons = document.querySelectorAll('.deleteItem');
deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', (e) => {
        let container = e.path[4];
        let item = e.path[4].dataset

        for(let i = 0; i < myList.length; i++) {
            let arr = myList[i];
            if(arr[0] === item.id && arr[2] === item.color) {
                myList.splice(i, 1)
                return  localStorage.setItem("myList", JSON.stringify(myList));
            }
        }

        container.remove()
        console.log(item)

    })
})

// CHECK THE FORM

let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');

let prenom = nom = adresse = ville = Email = 0;


let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
}

firstName.addEventListener('change', (e) => {
     contact.firstName = e.target.value;
     console.log(contact)
})

lastName.addEventListener('change', (e) => {
     contact.lastName = e.target.value;
     console.log(contact)
})

address.addEventListener('change', (e) => {
     contact.address = e.target.value;
     console.log(contact)
})

city.addEventListener('change', (e) => {
     contact.city = e.target.value;
     console.log(contact)
})

email.addEventListener('change', (e) => {
    let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    let test = regex.test(e.target.value);
    if(test) {
        contact.email = e.target.value;
        document.getElementById('emailErrorMsg').innerText = "";
        console.log(contact)
    } else {
        document.getElementById('emailErrorMsg').innerText = "email non valide";
        document.getElementById('emailErrorMsg').style.color = "red";
        document.getElementById('emailErrorMsg').style.fontSize = "20px";

    }
    
})


let productId = myList.map(product => product[0])

console.log(productId)
document.querySelector(".cart__order__form").addEventListener('submit', function(e)  {
   e.preventDefault();

  fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
        contact
        ,
        products : productId,
    })
  })
  .then(response => response.json())
  .then(json =>  { window.location.href = '../html/confirmation.html'; })
   

  
  
})


