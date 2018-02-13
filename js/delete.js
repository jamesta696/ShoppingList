
/*var clearBtn = document.querySelector("#clearBtn");
    clearBtn.addEventListener('click', clearBookmarks, false);*/

var shoppingList;

function initialize() {
    fetchProducts ();//this will populate the glabal shoppingList[] array on load.
    renderProducts();//immediately after, render the UI.
    wireupListeners();
}

function saveList(){
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}


function deleteProduct(id){
    for(var i = 0; i <= shoppingList.length-1; i++){
        if(shoppingList[i].id == id) {
            shoppingList.splice(i, 1);
            break;
        }
    }

    saveList();
    initialize();
}


function clickHandler(e){
    //console.log(e.target);
    var button = e.target;
    if(button.classList.contains("delete-button")){
        var id = button.getAttribute("id");
        deleteProduct(id);
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


function renderProducts(){
    var itemListResults = document.querySelector('#shoppingListResults');

    itemListResults.innerHTML = '';
    for(var i = 0; i <= shoppingList.length-1; i++){
        var itemList = shoppingList[i];
        itemListResults.innerHTML += '<div class="well">'+
                                        '<h3>' + itemList.name + " " + itemList.price + '<i class="fa fa-trash btn-primary delete-button" id="' + itemList.id + '"></i></h3>'+
                                     '</div>';         
    }

}

