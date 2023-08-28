/*Phone Search
URL Format: https://openapi.programming-hero.com/api/phones?search=${searchText}

Example: https://openapi.programming-hero.com/api/phones?search=iphone

Phone detail url:
URL Format: https://openapi.programming-hero.com/api/phone/${id}

Example: https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089*/

 const limitInput = document.getElementById("limit");
 const limit = limitInput.value;


const loadPhone = async (searchText='5') => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await response.json()
    const phones = data.data
    displayPhone(phones)

}


const displayPhone = phones => {
    const listPhones = document.getElementById("list-phones");
    const limitInput = document.getElementById("limit");
    const limit = limitInput.value;
     const noData = document.getElementById("noData");

    if (limitInput.value === 0 || limitInput.value === "") {
      limitInput.innerText = 0;
    } 
    else if(limitInput.value>0){
      phones = phones.slice(0, limit);
    }
    
    phones.length === 0 ? noData.classList.remove("hidden") : noData.classList.add("hidden")
      
  


    phones.forEach((phone) => {
      // console.log(phone)
      const div = document.createElement("div");

      div.innerHTML = `
        <div class="card pt-5 bg-base-100 shadow-xl">
        <figure>
            <img
            src="${phone.image}"
            />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.brand}</h2>
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div class="card-actions justify-end">
            <button onclick="showDetails('${phone.slug}')" id="detail" class="btn btn-primary">show Details</button>
            </div>
        </div>
        </div>
        
        `;
      listPhones.appendChild(div);
    }),
    //   my_modal_5.showModal();
    progressToggle(false);
    showAllAdd(phones);
}








const showDetails = async (id) => {
   const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await response.json();
    



{/* <p class="py-4">GPS:${data.data.others.GPS}</p>;  */}
showModal(data);
};



const showModal = (data) => {

    const s = data.data.mainFeatures.sensors;
    const sensorCount = () => {
        let sensorList = ""
        s.forEach((sensor) => {
          sensorList += `${sensor}, `
          
        });
        return sensorList.slice(0, -2);
        
       
    }

    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
    <h1 class="font-bold text-center text-3xl my-5"> ${data.data.name}</h1>
    <div class="flex justify-center items-center">
      <img src="${data.data.image}" alt="">
    </div>
    <div class="space-y-2">
      <h3 class="font-bold text-lg"><span class="font-bold">Brand:</span> ${
        data.data.brand
      }</h3>
    <h3 class="font-bold text-lg"><span class="font-bold">Model:</span> ${
      data.data.name
    }</h3>
    <p><span class="font-bold">Chipset:</span> ${
      data.data.mainFeatures.chipSet
    }</p>
    <p><span class="font-bold">Display Size:</span> ${
      data.data.mainFeatures.displaySize
    }</p>
    <p><span class="font-bold">Memory:</span> ${
      data.data.mainFeatures.memory
    }</p>
    <p><span class="font-bold">GPS:</span> ${
      data.data?.others?.GPS || "No Data Available"
    }</p>
    <p><span class="font-bold">Sensors:</span>${ sensorCount()}
    </p>
    <p><span class="font-bold">Storage:</span> ${
      data.data.mainFeatures.storage
    }</p>
    
    <p><span class="font-bold">ReleaseDate:</span> ${data.data.releaseDate}</p>
    </div>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
    `;
    



    my_modal_5.showModal();
}









const handleSearch = () => {
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    const listPhones = document.getElementById("list-phones");
    listPhones.innerHTML = ''
    progressToggle(true);
    loadPhone(searchText);
}

const showAllAdd = (data) => {
    const btnContainer = document.getElementById("show-all");
    if(limitInput.value > 0 && data.length !== 0) {
      
      btnContainer.classList.remove("hidden");
    }else{
        btnContainer.classList.add("hidden");
    }
}



const showAll = () => {
    limitInput.value = "";
    handleSearch();
}

const progressToggle = (isLoading) => {
    const spinner = document.getElementById("loading");
    if(isLoading){
        spinner.classList.remove("hidden");
    }else{
        spinner.classList.add("hidden");
    }
}



loadPhone()