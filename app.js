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
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 0, name: 'Eggs', calories: 400},
            {id: 0, name: 'Omelette', calories: 800}
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
        logData: function(){
            return data;
        }
    }
})();



//_____
//UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'

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
        getSelectors: function(){
            return UISelectors;
        }
    }
})();



//______
//Application Controller
const App = (function(ItemCtrl, UICtrl){
    //load event listeners
    const loadEventListeners = function(){
        //get UISelectors
        const UISelectors = UICtrl.getSelectors();

        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

   const itemAddSubmit = function(e){
       const input = UICtrl.getItemInput();
       console.log(input)


        //check for name and calorie input
        if (input.name !== '' && input.calories !== ''){
            //add item
           const  newItem = ItemCtrl.addItem(input.name, input.calories)
        }
       e.preventDefault();
   }

    //public method
    return{
        init: function(){
            console.log('Initializing Application')

            //fetching items from the data structure
            const items = ItemCtrl.getItems();

            //populate list with the items 
            UICtrl.populateItemList(items);

            //load event listeners
            loadEventListeners();

        }
    }

})(ItemCtrl, UICtrl);




//Initializing app
App.init();