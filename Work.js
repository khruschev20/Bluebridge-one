const Tree = {

      id: 'root',
    
      name: 'Root',
    
      items: ['item1', 'item2'],
    
      subcategories: [
    
        {
    
          id: 'electronics',
    
          name: 'Electronics',
    
          items: ['Apple MacBook Pro', 'ASUS ROG Strix 18 Intel'],
    
          subcategories: [
    
            {
    
              id: 'phones',
    
              name: 'Phones',
    
              items: ['Samsung Galaxy S23', 'iPhone 13'],
    
              subcategories: [],
    
            },
    
          ],
    
        },
    
      ],
    
    };
    
     
    
    const customerVisibility = {
    
      Dave: ['electronics', 'phones'],
    
      Henry: ['electronics'],
    
      Vince:['phones']
    
    };
    
     //The code is checking to see if the customer is in a category that would allow them to view the item, If they are not, then it returns false
    
    function itemIsVisibleToCustomer(item, customer) {
    
      const visibleCategories = customerVisibility[customer];
    
      if (!visibleCategories) {
    
        return false;
    
      }
    //The code returns true if the item is in a category that is visible.
      const categoryOfItem = getCategoryOfItem(item);
    
      return visibleCategories.includes(categoryOfItem);
    
    }
    
    //The code is trying to find the category of an item.
    
    function getCategoryOfItem(item, categoryNode = Tree) {
    
      if (categoryNode.items.includes(item)) {
    
    return categoryNode.id;
    
      } else {
    
        for (const subCategory of categoryNode.subcategories) {
    
          const result = getCategoryOfItem(item, subCategory);
    
          if (result) {
    
            return result;
    
          }
    
        }
    
      }
    
      return null;
    
    }
    
     
    
    function getVisibleItemsForCustomers(category, visibilityData) {
    
      const visibleItemsByCustomer = {};
    
     
    
      function traverse(categoryNode, visibleCategories) {
    
        if (!categoryNode) {
    
          return;
    
        }
    
    visibleCategories.push(categoryNode.id);
    
     
    
        categoryNode.subcategories.forEach((subCategory) => {
    
          traverse(subCategory, [...visibleCategories]);
    
        });
    
     
    
        Object.keys(visibilityData).forEach((customer) => {
    
          if (visibilityData[customer].some((cat) => visibleCategories.includes(cat))) {
    
            if (!visibleItemsByCustomer[customer]) {
    
              visibleItemsByCustomer[customer] = [];
    
            }
    
            categoryNode.items.forEach((item) => {
    
              if (itemIsVisibleToCustomer(item, customer)) {
    
                visibleItemsByCustomer[customer].push(item);
    
              }
    
            });
    
          }
    
        });
    
      }
    
     
    
      traverse(category, []);
    
     
    
      return visibleItemsByCustomer;
    
    }
    
     
    
    const visibleItems = getVisibleItemsForCustomers(Tree, customerVisibility);
    
    console.log(visibleItems);
