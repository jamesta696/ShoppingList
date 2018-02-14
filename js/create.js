var form = document.querySelector('#myForm');
    form = document.addEventListener('submit', saveList, false);
var productName = document.querySelector('#itemName');
var productPrice  = document.querySelector('#itemPrice');
var listTotal = document.querySelector('#total');

/*var clearBtn = document.querySelector("#clearBtn");
    clearBtn.addEventListener('click', clearBookmarks, false);*/

var shoppingList;





function initialize(){
    fetchProducts ();//this will populate the glabal shoppingList[] array on load.
    renderProducts();//immediately after, render the UI.
}

function generateID(){
    return Math.uuid()
}

function saveList(e){
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
         var itemList = {
             name : productName.value,
             price  : productPrice.value,
             id: generateID()
         };
     
    shoppingList.push(itemList);//add to global array
    
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); //now override storage with whatever is in global array.
         
         clearForm();
         renderProducts(); //render UI right after saving.
         totalSum(shoppingList);
         e.preventDefault();//prevents form from submitting to backend.
}

function totalSum(shoppingList) {
    listTotal.innerHTML ='';
    var productsTotal = 0;
    
    for(var i = 0; i <= shoppingList.length-1; i++) {
        //productsTotal = productsTotal + shoppingList[i];
        productsTotal = productsTotal + shoppingList[i].price;
    }
    listTotal.innerHTML = "Shopping List Total: $" + productsTotal;
}



function clearForm(){
    productName.value = '';
    productPrice.value = '';
}
 

// Fetch Bookmarks
function fetchProducts(){
    shoppingList = JSON.parse(localStorage.getItem('shoppingList'))||[];
}


function renderProducts(){
    var itemListResults = document.querySelector('#shoppingListResults');

    itemListResults.innerHTML = '';
    for(var i = 0; i < shoppingList.length; i++){
        var itemList = shoppingList[i];
        itemListResults.innerHTML += '<div class="well">'+
                                        '<h3>' + itemList.name + " " + itemList.price + '</h3>'+
                                     '</div>';         
    }
}

