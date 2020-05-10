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
        logData: function(){
            return data;
        }
    }
})();



//_____
//UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list'
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
        }
    }
})();



//______
//Application Controller
const App = (function(ItemCtrl, UICtrl){
    //public method
    return{
        init: function(){
            console.log('Initializing Application')
            //fetching items from the data structure
            const items = ItemCtrl.getItems();
            //populate list with the items 
            UICtrl.populateItemList(items)
        }
    }

})(ItemCtrl, UICtrl);




//Initializing app
App.init();