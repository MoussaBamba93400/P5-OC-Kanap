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
        option.innerText = product.colors

        document.getElementById('colors').appendChild(option)
    }

      console.log(product.colors)
}).catch(function(err) {
    console.log(err)
})