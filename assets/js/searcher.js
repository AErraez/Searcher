

let loadProducts= async (linkjson, linkxml,filtervalue='') => {
    try {
        let infojson= await fetch(linkjson)
        var resultjson= await infojson.json()
        let template=""
        if (filtervalue!='') {
          resultjson= resultjson.filter(elem=> elem.name==filtervalue || elem.type==filtervalue)
        }
        resultjson.forEach(elem => {
            template+= `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
            <div class="card card-blog card-plain">
              <div class="card-header p-0 mt-n4 mx-3">
                <a class="d-block shadow-xl border-radius-xl">
                  <img src="${elem.src}" alt="${elem.name}" class="img-fluid shadow border-radius-xl">
                </a>
              </div>
              <div class="card-body p-3">
                <p class="mb-0 text-sm">${elem.type}</p>
                <a href="javascript:;">
                  <h5>
                    ${elem.name}
                  </h5>
                </a>
                <p class="mb-4 text-sm">
                  <b>Price: </b> $ ${elem.price}
                </p>
              </div>
            </div>
            </div>`
            
        })
        let doclocation= document.getElementById("products")
        doclocation.innerHTML= template
        ;
        

    }
    catch (error) {
        console.log(error)
    }

    try {
        let infoxml=await fetch(linkxml)
        let resultxml= await infoxml.text()
        let xml=(new DOMParser()).parseFromString(resultxml, 'application/xml');
        let productlist= xml.getElementsByTagName("product")
        let resultxmlarr=[]
        let template=""
        for (let elem of productlist) {

            let elemobj= {
              name:elem.getElementsByTagName("name")[0].innerHTML,
              src:elem.getElementsByTagName("src")[0].innerHTML,
              price:elem.getElementsByTagName("price")[0].innerHTML,
              type:elem.getElementsByTagName("type")[0].innerHTML
            }
            resultxmlarr.push(elemobj)
        }
        if (filtervalue!='') {
          resultxmlarr= resultxmlarr.filter(elem=> elem.name==filtervalue || elem.type==filtervalue)
        }
        resultxmlarr.forEach(elem => {
          template+= `<div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
          <div class="card card-blog card-plain">
            <div class="card-header p-0 mt-n4 mx-3">
              <a class="d-block shadow-xl border-radius-xl">
                <img src="${elem.src}" alt="${elem.name}" class="img-fluid shadow border-radius-xl">
              </a>
            </div>
            <div class="card-body p-3">
              <p class="mb-0 text-sm">${elem.type}</p>
              <a href="javascript:;">
                <h5>
                  ${elem.name}
                </h5>
              </a>
              <p class="mb-4 text-sm">
                <b>Price: </b> $ ${elem.price}
              </p>
            </div>
          </div>
          </div>`
          
        })
        let doclocation= document.getElementById("products")
        doclocation.innerHTML+= template


    }
    catch (error) {
        console.log(error)
    }
}



URLJSON= "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json"
URLXML= "https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml" 



loadProducts(URLJSON,URLXML)

let filterbutton = document.getElementById("filter")

filterbutton.addEventListener('click',(event)=> {
  filtervalue= document.getElementById('text').value
  loadProducts(URLJSON,URLXML,filtervalue)

})