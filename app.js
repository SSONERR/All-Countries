const isimİnput = document.querySelector(".form-control")
const araButon = document.querySelector("#ara")
const cardBody = document.querySelector(".card-body")
const ul = document.querySelector("#ul")
const cardHeader = document.querySelector(".card-header")
const isim = document.querySelector("#isim")
const dil = document.querySelector("#dil")
const başkent = document.querySelector("#başkent")
const kıta = document.querySelector("#kıta")
const para = document.querySelector("#para")
const nufüs = document.querySelector("#nufüs")
const saat = document.querySelector("#saat")
const bayrak = document.querySelector("#bayrak")

run()
function run() {
    araButon.classList.add("disabled")
    araButon.addEventListener("click", boşDolu)
    isimİnput.addEventListener("keyup", () => { isimİnput.value == "" ? cardBody.className = "card-body d-none" : araButon.classList.remove("disabled") })
    //input boş olduğunda body'i kapatır
}

function boşDolu() {
    //eğer veri girilmemişse çalışmasını önler
    if (isimİnput.value !== "") {
        tümÜlkeler()
    } else {
        cardBody.className = "card-body d-none"
    }
}

async function tümÜlkeler() {
    //veriye istek atılır
    const response = await fetch(`https://restcountries.com/v3.1/translation/${isimİnput.value.toUpperCase().trim()}`)
    const data = await response.json()
    if (data.status === 404) {
        //ülke bulunamaz ile çalışır
        ul.remove()
        //alarm ekler
        const alarm = document.createElement("div")
        alarm.className = "alert alert-danger m-0"
        alarm.textContent = `Ülke Bulunamadı. Lütfen farklı bir dilde arayın !`
        cardBody.classList.remove("d-none")
        cardBody.appendChild(alarm)
        araButon.classList.add("disabled")
        setTimeout(() => {
            //alarmı kaldırır
            alarm.remove()
            cardBody.className = "card-body d-none"
            cardBody.appendChild(ul)
            araButon.classList.remove("disabled")
        }, 2000);
    } else {
        //ülke bulunursa çalışır
        bilgileriYazdır(data[0])
    }
}
function bilgileriYazdır(data) {
    //bilgileri listeye ekler 
    //--------------------------------------
    //ilk dili seçer 
    let diller = []
    for (let dil in data.languages) { diller.push(dil) }
    //-------------------------------------
    //ilk para birimini seçer
    let birim = ""
    for (let para in data.currencies) { birim = para }
    //------------------------------------------------------------
    cardBody.classList.remove("d-none")
    isim.textContent = `Ülke İsmi : ${data.name.common}`
    isim.className = "list-group-item"
    //------------------------------------------------------------
    dil.textContent = `Ülke dili : ${data.languages[diller[0]]}`
    dil.className = "list-group-item"
    //------------------------------------------------------------
    başkent.textContent = `Başkent : ${data.capital}`
    başkent.className = "list-group-item"
    //------------------------------------------------------------
    kıta.textContent = `Bulunduğu Kıta : ${data.continents}`
    kıta.className = "list-group-item"
    //------------------------------------------------------------
    para.textContent = `Para Birimi : ${birim}`
    para.className = "list-group-item"
    //------------------------------------------------------------
    nufüs.textContent = `Nufüs : ${data.population}`
    nufüs.className = "list-group-item"
    //------------------------------------------------------------
    saat.textContent = `Saat Dilimi : ${data.timezones}`
    saat.className = "list-group-item"
    //------------------------------------------------------------
    bayrak.textContent = "Bayrak : "
    bayrak.className = "list-group-item"
    //------------------------------------------------------------
    //bayrağı oluşturur
    const img = document.createElement("img")
    img.width = 150
    img.className = "rounded border"
    img.src = `${data.flags.png}`
    bayrak.appendChild(img)
}