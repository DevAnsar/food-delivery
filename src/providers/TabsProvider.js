import React, { useState, createContext, useEffect } from "react";
import { getAllCategoryApi,getSubCategoryDelivers } from "./../api/Category";
import toast from "react-hot-toast";

const TabContext = createContext(undefined);
function TabsProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [subSelectedTab, setSubSelectedTab] = useState(0);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      let { data } = await getAllCategoryApi();
      // console.log('categories:',data);
      if (data.status) {
        let categories = data.categories.map((category) => {
          return {
            ...category,
            sub: [{ id: 0, title: "همه", providers: [] }, ...category.sub],
          };
        });
        categories[0].sub[0].providers = data.providers;
        // console.log(categories);
        setCategories(categories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setTab = (newValue) => {
    setSubSelectedTab(0);
    setSelectedTab(newValue);
  };
  const getSubCategoryDeliveries = async (index, category, subCategory) => {
    setSubSelectedTab(index);
    // console.log(subCategory);
    let {data} = await getSubCategoryDelivers(category.id,subCategory.id);
    if(data.status){
      setCategories((prev)=>{
        let newCategories = prev.map(cat=>{
          if(cat.id === category.id){
            let newSubs=cat.sub.map((subCat)=>{
              if(subCat.id === subCategory.id){
                return {...subCat,providers:data.providers}
              }else{
                return {...subCat}
              }
            });
            return {...cat,sub : [...newSubs]}
          }else{
            return {...cat}
          }
        });
        return [...newCategories]
      })

    }else{
      toast.error(data.message)
    }

  };
  return (
    <TabContext.Provider
      value={{
        selectedTab,
        categories,
        setTab,
        subSelectedTab,
        getSubCategoryDeliveries,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
export { TabContext };
export default TabsProvider;
