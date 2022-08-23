fetch("http://localhost:3000/api/products")
.then(function(res) {
    if(res.ok)
    return res.json();
}).then(function(value) {
   
    for(let i = 0; i < value.length; i++) {
        let link = document.createElement('a');
        let article = document.createElement('article');
        let image = document.createElement('img');
        let h3 = document.createElement('h3');
        let paragraphe = document.createElement('p');
    
    
        link.setAttribute('href', `./product.html?id=${value[i]._id}`)

        image.setAttribute('src', value[i].imageUrl);
        image.setAttribute('alt', value[i].altTxt);
        
        h3.className = value[i].name;
        h3.innerText = value[i].name;
    
        paragraphe.className = value[i].description;
        paragraphe.innerText = value[i].description;

        link.appendChild(article);
        article.appendChild(image);
        article.appendChild(h3);
        article.appendChild(paragraphe);
        
        let container = document.getElementById('items');
        container.appendChild(link)

    }

    
   
    
}).catch((err) => {
   console.log(err)
})


