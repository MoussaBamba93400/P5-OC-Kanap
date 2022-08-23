let prix = 0;
let totalProduct = 0;

for(let i = 1; i <= localStorage.length; i++) {
    let data = localStorage[i].split(',')

   console.log(data)
   prix += parseInt(data[4], 10)
   totalProduct += parseInt(data[1], 10)

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
    input.className = "itemQuantity";
    input.setAttribute('type', "number");
    input.setAttribute('name', "itemQuantity");
    input.setAttribute('min', "1");
    input.setAttribute('max', "100");
    input.setAttribute('value', `${data[1]}`);

    let heading = document.createElement('h2');
    heading.innerText = "NOM"

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


console.log(localStorage)