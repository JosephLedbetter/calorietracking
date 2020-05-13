//Storage Controller
//Storage Controller
//Storage Controller
//Storage Controller
const StorageCtrl = (function(){
    //PUBLIC METHODS
    return {
        storeItem: function(item){
            let items;

            //CHECK FOR ITEMS IN LOCAL STORAGE
             if(localStorage.getItem('items') === null){
                items = [];
                //PUSH YOUR NEW ITEM 
                items.push(item);
                //SET LOCAL STORAGE
                localStorage.setItem('items', JSON.stringify(items));
             } else {
                //ITEMS TO GET ALREADY IN LOCAL STORAGE
                items =  JSON.parse(localStorage.getItem('items'));

                //PUSH NEW ITEMS
                items.push(item);

                //RESET LOCAL STORAGE
                localStorage.setItem('items', JSON.stringify(items));
             }
        }, 
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'))
            }
            return items;
        },
        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
            if(updatedItem.id === item.id){
                items.splice(index, 1, udpatedItem)
                }
            });
        localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
          
            items.forEach(function(item, index){
            if(id === item.id){
                items.splice(index, 1)
                }
            });
        },
        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }
    }
})();



//Item Controller
//Item Controller
//Item Controller
//Item Controller
//Item Controller

/*item controller ify statement running immediately */
const ItemCtrl = (function(){
    //item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    //DATA STRUCTURE & STATES
    const data = {
        items: StorageCtrl.getItemsFromStorage(), 
        currentItem: null,
        totalCalories: 0
    }
    //PUBLIC METHODS --> GIVES YOU THE ABILITY TO CALL TEH SPECIFIC ITEMS YOU NEED TO WORK WITH THE DATA STRUCTURES & PASS THROUGH THE NECESSARY FUNCTIONS
    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name, calories){
            let ID;
            //create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0
            }

            //calories to number
            calories = parseInt(calories);
            //create new item 
            newItem = new Item(ID, name, calories);
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            //loop through items
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories){
            //CALORIES TO NUMBER
            calories = parseInt(calories);

            let found = null;
            data.items.forEach(function(item){
                if (item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(id){
            // GET ID'S
            ids = data.items.map(function (item){
                return item.id
            });
            //GET THE INDEX
            const index = ids.indexOf(id);
            // REMOVE ITEM FROM ARRAY
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        },
        setCurrentItem: function(item){
            data.currentItem = item; 
        },
        getCurrentItem: function(){
            return data.currentItem; 
        },
        getTotalCalories: function(){
            let total = 0;
            //loop through items and add calories
            data.items.forEach(function(item){
                total += item.calories
            });
             // set total cal in data structure
             data.totalCalories = total;
             //return total
             return data.totalCalories;
        },
        logData: function(){
            return data;
        }
    }
})();



//_________________________________________________________________________________
//UI Controller
//UI Controller
//UI Controller
//UI Controller
//UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
    }
    //PUBLIC METHOD --> MAKING ALL FUNCTIONS BELOW APART OF THE UICTRL 'GROUP'
    //(this means when you need to call a specific function below then you will place 'UICtrl.' infront of your desired function to call)
    return {
        populateItemList: function(items){
            let html = '';
            items.forEach(function(item){
                html += ` <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
            });
            //insert list items
            document.querySelector(UISelectors.itemList).innerHTML = 
            html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },
        addListItem: function(item){
            //show list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //create 'li' element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;

            //insert item into the list
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        updateListItem: function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            //TURN NODE LIST INTO ARRAY
            listItems = Array.from(listItems);
            
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id');

                if (itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = 
                ` <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`
                }
            });
        }, 
        clearAll: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //TURN NODE LIST INTO AN ARRAY
            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();
            })
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        hideList: function(){ 
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        getSelectors: function(){
            return UISelectors;
        }
    }
})();



//_________________________________________________________________________________

//APPLICATION CONTROLLER
//APPLICATION CONTROLLER
//APPLICATION CONTROLLER
//APPLICATION CONTROLLER
//APPLICATION CONTROLLER
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    //load event listeners
    const loadEventListeners = function(){
        //GET UISelectors
        const UISelectors = UICtrl.getSelectors();


//**** ALL CLICK EVENT LISTENERS ****
//**** ALL CLICK EVENT LISTENERS ****
//**** ALL CLICK EVENT LISTENERS ****

// ____ ITEM CONTROLLER _____

        //ADD ITEM CLICK
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // DISABLE THE 'ENTER' KEY WHEN UPDATING ITEM
        document.addEventListener('keypress', function(e){
            if(e.keyCode === 13 || e.which === 13){
            e.preventDefault();
            return false;
            }
        });

        //EDIT ICON CLICK
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        //UPDATE ITEM CLICK 
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        //BACK BUTTON CLICK
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        //DELETE BUTTON CLICK
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // CLEAR ALL BUTTON CLICK
         //DELETE BUTTON CLICK
         document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAll);

    }

    //**** ADD ITEM AND SUBMIT TO THE ITEM-LIST HOLDER *****
    //**** ADD ITEM AND SUBMIT TO THE ITEM-LIST HOLDER *****
    //**** ADD ITEM AND SUBMIT TO THE ITEM-LIST HOLDER *****
   const itemAddSubmit = function(e){
       const input = UICtrl.getItemInput();

        //check for name and calorie input
        if (input.name !== '' && input.calories !== ''){
            //Add item
           const  newItem = ItemCtrl.addItem(input.name, input.calories);

        //ADD ITEM TO THE LIST
        UICtrl.addListItem(newItem);

        //GET TOTAL CALORIES
        const totalCalories = ItemCtrl.getTotalCalories();

        //ADD TOTAL CALORIES TO THE UI
        UICtrl.showTotalCalories(totalCalories);

        //STORE IN LOCAL STORAGE
        StorageCtrl.storeItem(newItem);

        //Clear fields
        UICtrl.clearInput();
        }
       e.preventDefault();
   }

   //**** EDIT ITEM WHEN CLICKING ON THE PENCIL ICON ****
   //**** EDIT ITEM WHEN CLICKING ON THE PENCIL ICON ****
   //**** EDIT ITEM WHEN CLICKING ON THE PENCIL ICON ****
   const itemEditClick = function(e){
    if(e.target.classList.contains('edit-item')){
    //get list-item ID
    const listId = e.target.parentNode.parentNode.id;

    //break into an array @ the dash 
    const listIdArr = listId.split('-');
   
    //get the actually ID number by ...
    const id = parseInt(listIdArr[1]);
    //get entire item
    const itemToEdit = ItemCtrl.getItemById(id);

    //set current item
    ItemCtrl.setCurrentItem(itemToEdit);

    //ADD ITEM TO FORM
    UICtrl.addItemToForm();
    }
    e.preventDefault();
   }

    //**** CLICK ON UPDATE BUTTON WHEN EDITING AN ITEM AND RESUBMITTING ****
    //**** CLICK ON UPDATE BUTTON WHEN EDITING AN ITEM AND RESUBMITTING ****
    //**** CLICK ON UPDATE BUTTON WHEN EDITING AN ITEM AND RESUBMITTING ****
    const itemUpdateSubmit = function(e){
        //GET ITEM INPUT
        const input = UICtrl.getItemInput();
        //UPDATE ITEM
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        ////UDPATE TIEM
        UICtrl.updateListItem(updatedItem)

        //GET TOTAL CALORIES
        const totalCalories = ItemCtrl.getTotalCalories()

        // ADD TOTAL CALORIES TO UI
        UICtrl.showTotalCalories(totalCalories);

        StorageCtrl.updateItemStorage(updatedItem);

        UICtrl.clearEditState();
        e.preventDefault()
    }

//ITEM DELETE SUBMIT EVENT
//ITEM DELETE SUBMIT EVENT
//ITEM DELETE SUBMIT EVENT
//ITEM DELETE SUBMIT EVENT
const itemDeleteSubmit = function(e){
    //RETRIEVE CURRENT ITEM
    const currentItem = ItemCtrl.getCurrentItem();
    //DELETE FROM DATA STRUCTURE
    ItemCtrl.deleteItem(currentItem.id);

    //DELETE FROM THE UI
    UICtrl.deleteListItem(currentItem.id);

    //GET TOTAL CALORIES
    const totalCalories = ItemCtrl.getTotalCalories()

    //ADD TOTAL CALORIES TO UI
    UICtrl.showTotalCalories(totalCalories);

    //DELETE FROM LOCAL STORAGE
    StorageCtrl.deleteItemFromStorage(currentItem.id)

    UICtrl.clearEditState();

    e.preventDefault();   
}

//CLEAR ALL ITEMS
//CLEAR ALL ITEMS
//CLEAR ALL ITEMS
//CLEAR ALL ITEMS
const clearAll = function(e){
    //DELETING ALL ITEMS FROM THE DATA STRUCTURE
    ItemCtrl.clearAllItems();  

    //REMOVE FROM UI
    UICtrl.clearAll();

    //GET TOTAL CALORIES
    const totalCalories = ItemCtrl.getTotalCalories()

    //ADD TOTAL CALORIES TO UI
    UICtrl.showTotalCalories(totalCalories);

    //CLEAR ITEMS FROM STORAGE
    StorageCtrl.clearItemsFromStorage();

    //HIDE UL
    UICtrl.hideList();

    e.preventDefault();
}

    //public method
    return{
        init: function(){
            //set initial state
            UICtrl.clearEditState();

            //fetching items from the data structure
            const items = ItemCtrl.getItems();

            //check if any items
            if (items.length === 0){
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }
                  //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        


            //load event listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl);

//Initializing app
App.init();

