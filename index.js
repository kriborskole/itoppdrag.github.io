// Definere variabler for firebase
const db = firebase.database();
const storage = firebase.storage();

// Definere variabler fra inputskjemaet
const registreroppdrag = document.querySelector("#registrerOppdrag")
const dato = document.querySelector("#dato");
const navn = document.querySelector("#navn");
const epost = document.querySelector("#epost");
const telefon = document.querySelector("#telefon");
const oppdragsbeskrivelse = document.querySelector("#oppdragsbeskrivelse");
const fil = document.querySelector("#fil");
const liste = document.querySelector("#liste");

// definere hvor metadata skal gå
const lager = db.ref("lager");

// hente ut main fra html
const main = document.querySelector("main");
// funksjon som lagrer bilde i databasen
function lagreData(e) {
    e.preventDefault();

    // Hvordan 'kortene' skal posisjoneres
    overlay.style.display = "flex";
    // Finne bilde som skal lastes opp
    const bildefil = fil.files[0];
    // hvor jeg skal laste opp bilde
    const lagringsplass = storage.ref("bilder/" + ( new Date() ) + bildefil.name)


    lagringsplass.put(bildefil)
    .then( bildefil => bildefil.ref.getDownloadURL() )
    .then( url => {
        lager.push({
            url: url,
            personNavn: navn.value,
            tekst: oppdragsbeskrivelse.value,
            tlf: telefon.value,
            email: epost.value,
            datoOppdrag: dato.value
        });
        skjema.reset();
    }) 
};

function visBildefil(snap) {
	const key = snap.key;
	const data = snap.val();
	
	main.innerHTML = `
	<article>
    <img src="${data.url}">
    <p><b>${data.personNavn}</b></p>
    <p>${data.tekst}</p>
    <p>${data.tlf}</p>
    <p>${data.email}</p>
    <p>${data.datoOppdrag}</p>
	</article>` + main.innerHTML;
    }
    
// Event Listeners
registreroppdrag.addEventListener("submit", lagreData);
lager.on("child_added", visBildefil)













/*
function tømmeInputs() {
    dato.value = "";
    navn.value = "";
    epost.value = "";
    telefon.value = "";
    oppdragsbeskrivelse.value = "";
    fil.value = "";
};

registrerOppdrag.onsubmit=function(evt) {
    evt.preventDefault(); // Man blir på samme side
    oppdrag.push({Dato: dato.value, Navn: navn.value, Epost: epost.value, Telefon: telefon.value, Oppdragsbeskrivelse: oppdragsbeskrivelse.value, Fil: fil.value});

    db.collection("registrere-oppdrag").doc().set({
        Dato, Navn, Epost, Telefon, Oppdragsbeskrivelse, Fil,
    });

    visListe();
    sendTilDatabase();
    tømmeInputs();
}

function sendTilDatabase() {

};

function visListe() { 
        oppdragsListe.innerHTML = "";   
        for(var element of oppdrag){
                oppdragsListe.innerHTML += "<li>" + " " + element.Navn + " "  + element.Dato + " " + " "  + element.Epost + " " + " "  + element.Telefon + " " + " "  + element.Fil + " " + "</li>"; 
            }
        } 

        */