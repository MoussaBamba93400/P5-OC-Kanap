

fetch('http://localhost:3000/api/products')
.then(function(res) {
    if(res.ok) {
        return res.json()
    }
}).then(function(value) {
    // find the right product
    let params = window.location.search
    params = params.slice(4, params.length)
     let test = value.filter((obj) => obj._id === params? obj: null )
     const product = test[0];

    //element creation 
    let image = document.createElement('img');
    image.setAttribute('src', product.imageUrl)



     let imgParents = document.getElementsByClassName('item__img')
     imgParents[0].appendChild(image)

     let description = document.getElementById('description');
     description.innerText = product.description;

    for(let i=0; i< product.colors.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', product.colors[i]);
        option.innerText = product.colors[i]

        document.getElementById('colors').appendChild(option)
    }
       
    document.getElementById('price').innerText = product.price
    console.log(product)
     

    function storeProduct(id, quantity, color, img, price) {

        for(let i = 1; i <= localStorage.length; i++) {
            let arr = localStorage[i].split(',');
            if(arr[0] === id && arr[2] === color) {
                arr[1] = parseInt(arr[1], 10) + 1;

                return localStorage.setItem(i, arr.join())
            } 
            
         }
        

        if(quantity == 0) {
            quantity = 1;
        }


        let item = [id, quantity, color, img, price];
         let key = localStorage.length +1;
        localStorage.setItem(key, item)

       console.log(localStorage)
       
    }
    
    document.getElementById('addToCart').addEventListener('click', () => storeProduct(product._id, document.getElementById('quantity').value, document.getElementById('colors').value, product.imageUrl, product.price))

    console.log(localStorage)
   
}).catch(function(err) {
    console.log(err)
})