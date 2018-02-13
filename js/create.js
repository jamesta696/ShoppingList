var form = document.querySelector('#myForm');
    form = document.addEventListener('submit', saveList, false);
var productName = document.querySelector('#itemName');
var productPrice  = document.querySelector('#itemPrice');

/*var clearBtn = document.querySelector("#clearBtn");
    clearBtn.addEventListener('click', clearBookmarks, false);*/

var shoppingList;





function initialize(){
    fetchBookmarks ();//this will populate the glabal shoppingList[] array on load.
    renderBookmarks();//immediately after, render the UI.
}

function generateID(){
    return Math.uuid()
}

function saveList(e){
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
         var itemList = {
             name : productName.value,
             url  : productPrice.value,
             id: generateID()
         };
     
    shoppingList.push(itemList);//add to global array
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList)); //now override storage with whatever is in global array.

         clearForm();
         renderBookmarks(); //render UI right after saving.
         e.preventDefault();//prevents form from submitting to backend.
}

function clearForm(){
    productName.value = '';
    productPrice.value = '';
}
 

// Fetch Bookmarks
function fetchBookmarks(){
    shoppingList = JSON.parse(localStorage.getItem('shoppingList'))||[];
}


function renderBookmarks(){
    var itemListResults = document.querySelector('#shoppingListResults');

    itemListResults.innerHTML = '';
    for(var i = 0; i < shoppingList.length; i++){
        var itemList = shoppingList[i];
        itemListResults.innerHTML += '<div class="well">'+
                                        '<h3><a href="' + itemList.url + '" id="' + itemList.id + '">' + itemList.name + '</a></h3>'+
                                     '</div>';         
    }
}

