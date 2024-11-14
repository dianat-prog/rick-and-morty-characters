const endPoint=`https://rickandmortyapi.com/api/character/?page=`;
let prevPage=document.getElementById('prev-page');
let nextPage=document.getElementById('next-page');
let ulList=document.getElementById('character-list');
let arrPersonajes=[];


//eventos del botón prev
prevPage.addEventListener('click',(event)=>{
    const prev=prevPage.dataset.page;
    let page=nextPage.dataset.page;

    if(prev===null){
        return;
    }
    else{
    
        //disminuir la página
        page=parseInt(page) - 1
        traerPersonajes(page);
    }
        

})


//eventos del botón next
nextPage.addEventListener('click',(event)=>{
    let page=nextPage.dataset.page;
    const next=nextPage.dataset.next;

    if(next===null){
        return
    }else{
        //aumento la página
        page=parseInt(page) + 1
        traerPersonajes(page);

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

    if (arrPersonaje.length>0){
          //Borramos los elementos que tenga el ul
        while (ulList.hasChildNodes()) {
        ulList.removeChild(ulList.lastChild);
        }

    }

    arrPersonaje.forEach((personaje)=>{
        //creamos elemento li
        const liElement=document.createElement('li');
        liElement.classList.add('item'); //Le añadimos una clase para modificar el CSS

        //creareamos un div  y dentro de ese div crearemos dos más: uno para la imagen de la pelicula y otro para el titulo
        const divContenedor=document.createElement('div');
        divContenedor.classList.add('contenedor'); //Le añadimos una clase para modificar el CSS
        
        
        //Creamos un  objeto imagen
        const divImagen=document.createElement('div');
        divImagen.classList.add('divimg'); //Le añadimos una clase para modificar el CSS
        const imgPeli=document.createElement('img');
        imgPeli.src=personaje.image;
        imgPeli.alt='imagen del personaje '+ personaje.name;
        //añadimos el elemento imagen en el div de imagen
        divImagen.appendChild(imgPeli);



       //elementos para el nombre y la especie
        const divInfo=document.createElement('div');
        divInfo.classList.add('divInfo'); //Le añadimos una clase para modificar el CSS
       //Nombre
        const divName=document.createElement('div');
        const namePers=document.createElement('span');
        const nameBold=document.createElement('span');
        nameBold.classList.add('spanbold'); //Le añadimos una clase para modificar el CSS
        nameBold.textContent='Name: ';
        namePers.textContent=personaje.name;
        divName.appendChild(nameBold);
        divName.appendChild(namePers);
        divInfo.appendChild(divName);

       //Especie
        const divSpecie=document.createElement('div');
        const speciePers=document.createElement('span');
        const specieBold=document.createElement('span');
        specieBold.classList.add('spanbold'); //Le añadimos una clase para modificar el CSS
        specieBold.textContent='Species: ';
        speciePers.textContent=personaje.species;
        divSpecie.appendChild(specieBold);
        divSpecie.appendChild(speciePers);
        divInfo.appendChild(divSpecie);
        
     
   
        //Añadimos en el div contenedor los dos div : el de imagen y el de la información del personaje
        divContenedor.appendChild(divImagen);
        divContenedor.appendChild(divInfo);
    
        //ñadimos el div contenedor al elemento li
        liElement.appendChild(divContenedor);

        //por último añadimos el elemento li al elemento ul
        ulList.appendChild(liElement);
    })
}

traerPersonajes(1);


