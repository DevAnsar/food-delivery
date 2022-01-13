import React, { useState, createContext, useEffect } from "react";
import {
  getAllCategoryApi,
  getSubCategoryDelivers,
  likeDelivery,
} from "./../api/Category";
import toast from "react-hot-toast";

const TabContext = createContext(undefined);
function TabsProvider({ children }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [subSelectedTab, setSubSelectedTab] = useState(0);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    // console.log('selectedTab',categories)
    if (categories.length > 0)
      getSubCategoryDeliveries(0, categories[selectedTab].id, 0);
  }, [selectedTab]);

  const getCategories = async () => {
    try {
      let { data } = await getAllCategoryApi();
      // console.log('categories:',data);
      let {
        status,
        message,
        data: { categories, providers },
      } = data;

      if (status) {
        let newCategories = categories.map((category) => {
          return {
            ...category,
            sub: [{ id: 0, title: "همه", providers: [] }, ...category.sub],
          };
        });
        newCategories[0].sub[0].providers = providers;
        // console.log(newCategories);
        setCategories(newCategories);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setTab = (newValue) => {
    setSubSelectedTab(0);
    setSelectedTab(newValue);
  };
  const getSubCategoryDeliveries = async (index, categoryId, subCategoryId) => {
    setSubSelectedTab(index);
    let { data } = await getSubCategoryDelivers(categoryId, subCategoryId);
    let {
      message,
      status,
      data: { providers },
    } = data;
    if (status) {
      setCategories((prev) => {
        let newCategories = prev.map((cat) => {
          if (cat.id === categoryId) {
            let newSubs = cat.sub.map((subCat) => {
              // console.log(subCat);
              if (subCat.id === subCategoryId) {
                return { ...subCat, providers };
              } else {
                return { ...subCat };
              }
            });
            return { ...cat, sub: [...newSubs] };
          } else {
            return { ...cat };
          }
        });
        return [...newCategories];
      });
    } else {
      toast.error(message);
    }
  };
  const setProviderLike = async (providerId, like) => {
    let { data } = await likeDelivery(providerId,like);
    console.log(data);
    let { status, message , data:{stage} } = data;
    if (status) {
      setCategories((prev) => {
        let newCategories = prev.map((cat) => {
          let newSubs = cat.sub.map((subCat) => {
            let new_providers = [];
            if (subCat.providers) {
               new_providers = subCat.providers.map((provider) => {
                if (provider.id === providerId) {
                  return { ...provider, like: stage };
                } else {
                  return { ...provider };
                }
              });
            }

            return { ...subCat, providers: [...new_providers] };
          });
          return { ...cat, sub: [...newSubs] };
        });
        return [...newCategories];
      });
    } else {
      toast.error(message);
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
        setProviderLike,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
export { TabContext };
export default TabsProvider;
