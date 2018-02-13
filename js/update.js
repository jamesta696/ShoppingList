var form = document.querySelector('#myForm');
    form = document.addEventListener('submit', saveList, false);
var productName = document.querySelector('#itemName');
var productPrice  = document.querySelector('#itemPrice');
var id;
/*var clearBtn = document.querySelector("#clearBtn");
    clearBtn.addEventListener('click', clearBookmarks, false);*/

var shoppingList;


function initialize(){
    fetchProducts ();//this will populate the glabal shoppingList[] array on load.
    renderProducts();//immediately after, render the UI.
    wireupListeners();
}

function generateID(){
    return Math.uuid()
}

function saveList(e){
    for(var i = 0; i <= shoppingList.length-1; i++){
        if(shoppingList[i].id == id) {
            var itemList = shoppingList[i];
            var oldname = itemList.name;
            itemList.name = productName.value;
            itemList.price = productPrice.value;
            var newname = itemList.name;
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            renderProducts();
            alert("Changes Saved From " +oldname+ " to " +newname);
            break;
        }
    }
    productName.value = '';
    productPrice.value = '';
    // shoppingList.push(itemList);//add to global array
     
    e.preventDefault();//prevents form from submitting to backend.
}
 


function clickHandler(e){
    //console.log(e.target);
    var button = e.target;
    if(button.classList.contains("edit-button")){
        var id = button.getAttribute("id");
        editProduct(id);
    }
}

function wireupListeners(){
    var itemListResults = document.querySelector('#shoppingListResults');
    itemListResults.addEventListener("click", clickHandler, false)
}

// Fetch Bookmarks
function fetchProducts(){
    shoppingList = JSON.parse(localStorage.getItem('shoppingList'))||[];
}

function editProduct(id){
    for(var i = 0; i <= shoppingList.length-1; i++){
        if(shoppingList[i].id == id) {
            var itemList = shoppingList[i];
            populateForm(itemList);
            break;
        }
    }
}

function populateForm(itemList){
    productName.value = itemList.name;
    productPrice.value = itemList.price;
    id = itemList.id;
}


function renderProducts(){
    var itemListResults = document.querySelector('#shoppingListResults');  

    itemListResults.innerHTML = '';
    for(var i = 0; i < shoppingList.length; i++){
        var itemList = shoppingList[i];
        itemListResults.innerHTML += '<div class="well">'+
                                        '<h3><a href="' + itemList.price + '">' + itemList.name + '</a><span class="edit-button fa fa-edit" id="' + itemList.id + '"></span</h3>'+
                                     '</div>';         
    }

}

