const endPoint=`https://rickandmortyapi.com/api/character/?page=`;
let prevPage=document.getElementById('prev-page');
let nextPage=document.getElementById('next-page');
let ulList=document.getElementById('character-list');
let arrPersonajes=[];


//eventos del botón prev
prevPage.addEventListener('click',(event)=>{
    const page=prevPage.dataset.page;

    if(!prevPage.dataset.prev===null){
        console.log('pag',page - 1)
        traerPersonajes(page-1);

    }
})

nextPage.addEventListener('click',(event)=>{
    const page=nextPage.dataset.page;
    const next=nextPage.dataset.next;
   //console.log('next');
    //console.log(nextPage.dataset.page);
console.log(nextPage.dataset.next);
   if(next==null){
   return
}else{
    console.log('pag');
    
    traerPersonajes(page +1);

}
})


//Obtenemos el array con los personajes
function traerPersonajes(pag){
    fetch(endPoint + pag).then( 
    (response)=>{
        if (!response.ok){
            throw new Error('La solicitud no fue exitosa')
        }
        return response.json();
    })
    .then((personajes)=>{
        mostrarPersonajes(personajes.results)

        prevPage.setAttribute('data-prev',personajes.info.prev);
        prevPage.setAttribute('data-page',pag);

    
        nextPage.setAttribute('data-next',personajes.info.next);
        nextPage.setAttribute('data-page',pag);

    }).catch((error)=>{
       alert('Error al consultar los personajes')
    });

}


function mostrarPersonajes(arrPersonaje){
  
    arrPersonaje.forEach((personaje)=>{
        //creamos elemento li
        const liElement=document.createElement('li');
        liElement.classList.add('item'); //Le añadimos una clase para modificar el CSS

        //creareamos un div  y dentro de ese div crearemos dos más: uno para la imagen de la pelicula y otro para el titulo
        const divContenedor=document.createElement('div');
        divContenedor.classList.add('contenedor'); //Le añadimos una clase para modificar el CSS
        
        const divImagen=document.createElement('div');
        divImagen.classList.add('divimg'); //Le añadimos una clase para modificar el CSS
    
        const divInfo=document.createElement('div');
        divInfo.classList.add('divInfo'); //Le añadimos una clase para modificar el CSS
    
    
       //Creamos un  objeto imagen
        const imgPeli=document.createElement('img');
        imgPeli.src=personaje.image;

        imgPeli.alt='imagen del personaje '+ personaje.name;
 
       //elemento h3 para el titulo de la pelicula
        const namePers=document.createElement('span');
        const speciePers=document.createElement('span');
        
        namePers.textContent=personaje.name;
        speciePers.textContent=personaje.species;

       //añadimos el elemento imagen en el div de imagen
        divImagen.appendChild(imgPeli);
    
    
        //añadimos los elementos span en el div de infromaciín
        divInfo.appendChild(namePers);
        divInfo.appendChild(speciePers);
   
    
        //Añadimos en el div contenedor los dos div : el de imagen y el de la información del personaje
        divContenedor.appendChild(divImagen);
        divContenedor.appendChild(divInfo);
    
        //por ultimo añadimos el div contenedor al elemento li
        liElement.appendChild(divContenedor);
        //por último añadimos el elemento li al elemento ul
        ulList.appendChild(liElement);
    })
}

traerPersonajes(1);


