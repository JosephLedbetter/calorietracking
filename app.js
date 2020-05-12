//Stoage Controller

//Item Controller

/*item controller ify statement running immediately */
const ItemCtrl = (function(){
    //item constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    //data structure/state
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Eggs', calories: 400},
            // {id: 2, name: 'Omelette', calories: 800}
        ], 
        currentItem: null,
        totalCalories: 0
    }
    //public methods
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
        setCurrentItem: function(item){
            data.currentItem = item;
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
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        clearBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
    }
    //public method
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
        clearInputFields: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function(){
            UICtrl.clearInputFields();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.clearBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        getSelectors: function(){
            return UISelectors;
        }
    }
})();



//_________________________________________________________________________________
//Application Controller
const App = (function(ItemCtrl, UICtrl){
    //load event listeners
    const loadEventListeners = function(){
        //get UISelectors
        const UISelectors = UICtrl.getSelectors();

        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //edit icon click
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit)
    }

   const itemAddSubmit = function(e){
       const input = UICtrl.getItemInput();
       console.log(input)


        //check for name and calorie input
        if (input.name !== '' && input.calories !== ''){
            //Add item
           const  newItem = ItemCtrl.addItem(input.name, input.calories);

        //Add item to the ui list
        UICtrl.addListItem(newItem);

        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //add total calories to UI
        UICtrl.showTotalCalories(totalCalories);

        //Clear fields
        UICtrl.clearInputFields();
        }
       e.preventDefault();
   }

   //Update item submit
   const itemUpdateSubmit = function(e){
    if(e.target.classList.contains('edit-item'))

    //get list-item ID
    listId = e.target.parentNode.parentNode.id;
    console.log(listId)

    //break into an array @ the dash 
    const listIdArr = listId.split('-');

    //get the actually ID number by ...
    const id = parseInt(listIdArr[1]);

    //get entire item
    const itemToEdit = ItemCtrl.getItemById(id);
    
    //set current item
    ItemCtrl.setCurrentItem(itemToEdit);

    e.preventDefault();
   }

    //public method
    return{
        init: function(){
            //set initial state
            UICtrl.clearEditState();
            console.log('Initializing Application')

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

})(ItemCtrl, UICtrl);

//Initializing app
App.init();