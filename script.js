//1 CREAZIONE DIV CONT
for (let i=0;i<contenuto.length;i++){
	const div_cont=document.createElement('div');
	div_cont.classList.add('cont');
	div_cont.dataset.indice=i;//segnalo i blocchi contenitori con un indice
   
	const struct=document.querySelector('.struttura');
	struct.appendChild(div_cont);	
}
//2 CREAZIONE DIV HEAD
for (let i=0;i<contenuto.length;i++){
	const div_head=document.createElement('div');
	div_head.classList.add('head');//aggiungo la classe head	
	
	const conte=document.querySelectorAll('.cont');
	conte[i].appendChild(div_head);
	
}
//3 CREAZIONE CONTENUTO DINAMICO
for (let i=0;i<contenuto.length;i++){
	const new_h1=document.createElement('h1');
	new_h1.textContent=contenuto[i].titolo;
	const prefe= document.createElement('img');
	prefe.src="favorites.png";
	prefe.classList.add('prefe');
	
	const inte=document.querySelectorAll('.head');
	inte[i].appendChild(new_h1);
	inte[i].appendChild(prefe);
	
	const new_img=document.createElement('img');
	new_img.src=contenuto[i].immagine;
	const conte=document.querySelectorAll('.cont');
	conte[i].appendChild(new_img);
	
	const descr=document.createElement('p');
	descr.textContent=contenuto[i].descrizione;
	descr.classList.add('hidden');
	conte[i].appendChild(descr);
	
	const testo=document.createElement('h3');
	testo.textContent="Leggi la descrizione!";
	conte[i].appendChild(testo);
	
	
}

let film_preferiti=[];//LISTA NELLA QUALE VENGONO AGGIUNTI I FILM AGGIUNTI TRA I PREFERITI

let indicesplice=0;
let eliminaind=0;

function controlla_sez_prefe(){
	const section_prefe=document.querySelector('#sez_prefe');

			//SE LA LISTA FILM E' VUOTA LA SEZIONE SCOMPARE
	if(film_preferiti.length===0){
		section_prefe.classList.add('hidden');
	} else{
		section_prefe.classList.remove('hidden');
	}
}


function Remove(){
	console.log(film_preferiti);
	
	const ref=document.querySelector('#sez_prefe');
	const ref2=event.currentTarget.parentNode.parentNode.parentNode.parentNode;
	
	//controllo se la rimozione è avvenuta dai preferiti
	if (ref===ref2){//ho cliccato il rimuovi dalla sezione preferiti apposita
	//event.currentTarget.src="favorites.png";
	
	
	//se la rimozione avviene sui preferiti devo aggiornare l'array(2), eliminare il contenitore(3) del film e aggiornare l'immagine(1)
	const conte=document.querySelectorAll('.struttura .cont');
	const id=event.currentTarget.parentNode.parentNode.dataset.ind;//indice del contenitore dell'evento
	//AGGIORNO L'IMMAGINE(1)
	for(cont of conte){
		if(id===cont.dataset.indice){
			const imag=cont.querySelectorAll('img');
			imag[0].src="favorites.png";
			imag[0].addEventListener('click',Preferiti);	
		}
	}
	//AGGIORNO LA LISTA DEI PREFERITI(2)
	for (film of film_preferiti){
		if(id===film.ind){
			 indicesplice=film_preferiti.indexOf(film);
		}
	}
			film_preferiti.splice(indicesplice,1);			
			console.log("Stampo la lista dei film modificata");
			console.log(film_preferiti);
	
	//rimuovo l'elemento creato dalla sezione preferiti(3)
	const rimozione=event.currentTarget.parentNode.parentNode;
	rimozione.remove();
	controlla_sez_prefe();
  }	else{//sono nella sezione contenuti 
    //IN CASO DI REMOVE DALLA SEZIONE CONTENUTI DEVO: AGGIORNARE L'IMMAGINE(1), RIMUOVERE L'ELEMENTO DALLA SEZ PREFERITI(3), AGGIORNARE LA LISTA PREFERITI(2)
	//(1)
	event.currentTarget.src="favorites.png";
	event.currentTarget.removeEventListener('click',Remove);
	event.currentTarget.addEventListener('click',Preferiti);
	const id2=event.currentTarget.parentNode.parentNode.dataset.ind;
		//2
		
		
		for (film of film_preferiti){
		if(id2===film.ind){
			 eliminaind=film_preferiti.indexOf(film);
		}
	}
	film_preferiti.splice(eliminaind,1);
	controlla_sez_prefe();
		
	
	const indicesez=event.currentTarget.parentNode.parentNode.dataset.indice;
	const contpreferi=document.querySelectorAll('#sez_prefe div .cont');
	
	for(contenitore of contpreferi){
		if(contenitore.dataset.ind===indicesez){
			contenitore.remove();
		}
	}
	
	controlla_sez_prefe();
  }
}
function Preferiti(event){
	console.log("Sono stato aggiunto ai preferiti" + event.currentTarget.parentNode.parentNode.dataset.indice);
	event.currentTarget.src="remove.jpg";
	event.currentTarget.removeEventListener('click',Preferiti);
	event.currentTarget.addEventListener('click',Remove);
	
	const indice=(event.currentTarget.parentNode.parentNode).dataset.indice;
	//prendo l'elemento corrispondente all'indice nella struttura iniziale
	const elemento=contenuto[indice];
	//costruisco una mappa che contiene il contenuto dell'elemento scelto come preferito
	const oggetto_preferito={
		titolo:elemento.titolo,
		immagine:elemento.immagine,
		ind: indice
	};
	
	//ho un array composto da titolo,immagine e indice dei preferiti
	film_preferiti.push(oggetto_preferito);
	console.log(film_preferiti);
	
	//si occupa di far apparire e sparire la sezione dei preferiti
	controlla_sez_prefe();
		
	const contenuti= document.querySelector('#sez_prefe div');	
	contenuti.innerHTML='';

//per ogni elemento presente nell'array creo un elemento da mettere poi nei preferiti		
for (let i=0;i<film_preferiti.length;i++){
			const new_cont=document.createElement('div');//creo l'elemento contenitore 
			new_cont.classList.add('cont');			
			new_cont.dataset.ind=film_preferiti[i].ind;
			
			const sez=document.querySelector('#sez_prefe div');
			sez.appendChild(new_cont);//appendo il contenitore nella sezione preferiti
		
			const new_head=document.createElement('div');
			new_head.classList.add('head');
		
			const cont=document.querySelectorAll('#sez_prefe .cont');
			cont[i].appendChild(new_head);//creo il contenitore e l'intestazione di un singolo film preferito e appendo
//in questo modo, a seconda della lunghezza dell'array creo i vari div contenitori e gli head			

			const new_titolo=document.createElement('h1');
			new_titolo.textContent=film_preferiti[i].titolo;
			
			const rem=document.createElement('img');
			rem.src="remove.jpg";
			rem.classList.add('prefe');
			rem.addEventListener('click',Remove);
			
			const head_rif=document.querySelectorAll('.head');
			head_rif[i].appendChild(new_titolo);
			head_rif[i].appendChild(rem);
			
			const imm=document.createElement('img');
			imm.src=film_preferiti[i].immagine;
			cont[i].appendChild(imm);

}


}


//FUNZIONI RELATIVE ALLA DESCRIZIONE.OK
function VisualizzaMeno(){
	event.currentTarget.textContent="Leggi la descrizione!";
	const mostra= event.currentTarget.parentNode.querySelector('p');
	mostra.classList.add('hidden');
	event.currentTarget.addEventListener('click',MostraDescrizione);
	event.currentTarget.removeEventListener('click', VisualizzaMeno);	
}
function MostraDescrizione(){
	event.currentTarget.textContent="Mostra di meno!";
	const mostra= event.currentTarget.parentNode.querySelector('p');
	mostra.classList.remove('hidden');
	event.currentTarget.removeEventListener('click',MostraDescrizione);
	event.currentTarget.addEventListener('click', VisualizzaMeno);
}
//AGGIUNGE UN EVENT LISTENER SUI PREFERITI
const pref=document.querySelectorAll('.prefe');
for (preferiti of pref){
preferiti.addEventListener('click',Preferiti);
}
//EVENTO SULLA DESCRIZIONE
const de=document.querySelectorAll('.struttura h3')
for(descrizione of de){
	
	descrizione.addEventListener('click',MostraDescrizione);
}

//EVENTO SULLA BARRA DI RICERCA
const barra=document.querySelector('header input');
barra.addEventListener('keyup',Barra_di_Ricerca);


function Barra_di_Ricerca(event){
		const ricerca=event.currentTarget.value.toLowerCase();
		//console.log(ricerca);
		if (ricerca===''){
			const cont=document.querySelectorAll('.struttura .cont');

			for(contenitore of cont){
				contenitore.classList.remove('nascondi');
			}
			controlla_sez_prefe();
		} else{
			const cont=document.querySelectorAll('.struttura .cont');
			console.log(cont);
			for (contenitore of cont) {
				contenitore.classList.add('nascondi');
			}
			console.log("La parola immessa in input è." + ricerca);
			for(let i=0;i<cont.length;i++){
			 const titolo=cont[i].querySelector('h1').textContent.toLowerCase();
			 //console.log(titolo);
			 if(titolo.indexOf(ricerca)!==-1){
					cont[i].classList.remove('nascondi');
			 }
		  }
		}	
}







