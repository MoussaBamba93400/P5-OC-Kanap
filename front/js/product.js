let params = window.location.search
params = params.slice(4, params.length)


fetch(`http://localhost:3000/api/products/${params}`)
.then(function(res) {
    if(res.ok) {
        return res.json()
    }
}).then(function(value) {
    // find the right product
     
    console.log(value)

    
     const product = value;
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
     

    function storeProduct(id, quantity, color) {
        
        if(color == "") {
            return window.alert('Veuillez choisir la couleur!')
        }

        if(quantity < 1) {
            return window.alert('Veuillez choisir la quantité!');
        }

        if(localStorage.length === 0) {
            localStorage.setItem("myList", "[]");
        }

        let myList = JSON.parse(localStorage.getItem("myList", "[]"));
        

        
        for(let i = 0; i < myList.length; i++) {


            let arr = myList[i];

            if(arr[0] === id && arr[2] === color) {
                arr[1] = parseInt(arr[1]) + 1;

               myList[i] = arr;
               return  localStorage.setItem("myList", JSON.stringify(myList));
            } 
            
         }
        
        

        


        let item = [id, quantity, color];
        myList.push(item);
        localStorage.setItem("myList", JSON.stringify(myList));
        
    

       console.log(localStorage.getItem("myList"))
       
    }
    
    document.getElementById('addToCart').addEventListener('click', () => storeProduct(product._id, document.getElementById('quantity').value, document.getElementById('colors').value))

    let myList = JSON.parse(localStorage.getItem("myList"));
   
   
   console.log(myList)

    
}).catch(function(err) {
    console.log(err)
})