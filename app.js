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

    return {
        logData: function(){
            return data;
        }
    }
})();

//UI Controller
const UICtrl = (function(){

})();


//Application Controller
const App = (function(ItemCtrl, UICtrl){

    return{
        init: function(){
            console.log('Initializing Application')
        }
    }

})(ItemCtrl, UICtrl);

//Initializing app
App.init();