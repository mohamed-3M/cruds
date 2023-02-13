let Title = document.getElementById("title")
let Price = document.getElementById("price")
let Taxes = document.getElementById("taxes")
let Ads = document.getElementById("ads")
let Discount = document.getElementById("discount")
let Total = document.getElementById("total")
let Count = document.getElementById("count")
let Category = document.getElementById("category")
let create = document.getElementById("create")

let mode = "create"
let temp ;
// GET TOTAL PRICE
function getTotal(){
    if(Price.value != ''){
        let result = ( +Price.value + +Taxes.value + +Ads.value) - +Discount.value
        Total.innerHTML = result
        Total.style.background = '#040';
    }else{
        Total.innerHTML = ''
        Total.style.background = '#7f1d1d'
    }
}

// CREATE DATA 
let Data ;
if(localStorage.Product != null){
    Data = JSON.parse(localStorage.Product)
}else{
    Data = []
}

// CREATE DATA 
create.onclick = function(){
    let DataObj = {
        Title:Title.value.toLowerCase(),
        Price:Price.value,
        Taxes:Taxes.value,
        Ads:Ads.value,
        Discount:Discount.value,
        Total:Total.innerHTML,
        Count:Count.value,
        Category:Category.value.toLowerCase(),
    }
    // COUNT DATA BASE ON NUMBER
    if(Title.value != '' 
    && Price.value != '' 
    && Category.value != ''
    && Data.Count < 100
    ){
        if(mode === 'create'){
            if(DataObj.Count > 1 ){
                for(let n = 0 ; n < DataObj.Count ; n++)
                Data.push(DataObj)
            }else{
                Data.push(DataObj)
            }
            }else{
                Data[  temp  ]  = DataObj
                Count.style.display = ''
                create.innerHTML = 'Create'
                create.style.background = '#530079'
            }
    ClearInpunt()
    }    
    localStorage.setItem("Product" , JSON.stringify(Data))
    ShowData()
}

// CLEAR INPUNT FILED AFTER CLCIK ON BUTTON CREATE
function ClearInpunt(){
        Title.value =''
        Price.value =''
        Taxes.value =''
        Ads.value =''
        Discount.value =''
        Total.innerHTML =''
        Count.value = ''
        Category.value = ''
}


// SHOWDATA IN ARRY 'DATA' IN TABLE
function ShowData(){
    let table = ''
    for(let i = 0 ; i < Data.length ; i++){
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${Data[i].Title}</td>
        <td>${Data[i].Price}</td>
        <td>${Data[i].Taxes}</td>
        <td>${Data[i].Ads}</td>
        <td>${Data[i].Discount}</td>
        <td>${Data[i].Total}</td>
        <td>${Data[i].Category}</td>
        <td><button onclick="update(${i})">update</button></td>
        <td><button onclick="Delete(${i})">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table
    
    // BUTTON DELETE ALL DATA FROM TABLE AND LOCALSTORGE
    
    let btnDeleteAll = document.getElementById("DeleteAll")
    if(Data.length > 0){
        btnDeleteAll.innerHTML = `<button onclick="DeleteAllData()" style="background: #a33d3d;">Delete All (${Data.length})</button>`;
    }else{
        btnDeleteAll.innerHTML = '';
    }

}
ShowData()

// Delete 
function Delete(i){
    Data.splice(i,1)
    localStorage.Product = JSON.stringify(Data)
    ShowData()
}

// DELETE ALL 
function DeleteAllData(){
    localStorage.clear()
    Data.splice(0)
    ShowData()
}

//   UPDATE ON ELEMENTS

function update(i){
    Title.value = Data[i].Title.toLowerCase()
    Price.value = Data[i].Price
    Taxes.value = Data[i].Taxes
    Ads.value = Data[i].Ads
    Discount.value = Data[i].Discount
    getTotal()
    Category.value = Data[i].Category.toLowerCase()
    mode = update
    Count.style.display = 'none'
    create.innerHTML = 'Update'
    create.style.background = '#f37b20'
    temp = i
    scroll({top : 0 ,
            behavior : 'smooth'
    })
}

// SEARCH IN DATA 
let searchMood = 'title'
function searchGet(id){
    let search = document.getElementById("search")
    if(id == 'searchTitle'){
        searchMood = 'title'
    }else{
        searchMood = 'category'
    }
    search.placeholder = 'Search By '+ searchMood
    search.focus();
    search.value = '';
    ShowData();
}

function searchInData(value){
    let table = '';
    for(let i = 0 ; i < Data.length ; i++){
        if(searchMood == 'title'){
            if(Data[i].Title.includes(value.toLowerCase() ) ){
                table += `
                    <tr>
                    <td>${i + 1}</td>
                    <td>${Data[i].Title}</td>
                    <td>${Data[i].Price}</td>
                    <td>${Data[i].Taxes}</td>
                    <td>${Data[i].Ads}</td>
                    <td>${Data[i].Discount}</td>
                    <td>${Data[i].Total}</td>
                    <td>${Data[i].Category}</td>
                    <td><button onclick="update(${i})">update</button></td>
                    <td><button onclick="Delete(${i})">delete</button></td>
                    </tr>
                    `
            }
            console.log("Hello")
        }
        else{
            if(Data[i].Category.includes(value.toLowerCase())){
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${Data[i].Title}</td>
                <td>${Data[i].Price}</td>
                <td>${Data[i].Taxes}</td>
                <td>${Data[i].Ads}</td>
                <td>${Data[i].Discount}</td>
                <td>${Data[i].Total}</td>
                <td>${Data[i].Category}</td>
                <td><button onclick="update(${i})">update</button></td>
                <td><button onclick="Delete(${i})">delete</button></td>
                </tr>
                `
            }
        }}
    document.getElementById('tbody').innerHTML = table
}