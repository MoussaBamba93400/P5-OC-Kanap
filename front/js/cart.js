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

