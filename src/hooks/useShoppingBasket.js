import { useContext } from "react";
import toast from "react-hot-toast";
import { ShoppingBasketContext } from "../providers";
function useShoppingBasket() {
  const context = useContext(ShoppingBasketContext);

  if (context === undefined)
    throw new Error("useShoppingBasket must be within AuthProvider!");

  return context.basket;
}
function useActionShoppingBasket() {
  const context = useContext(ShoppingBasketContext);

  if (context === undefined)
    throw new Error("useShoppingBasket must be within AuthProvider!");

  const setBasket = context.setBasket;
  const basketProducts = context.basket.products;
  const provider = context.basket.provider;
  const show = context.showBasket;
  const setShowBasket = context.setShowBasket;

  const addToBasket = (Product, Provider) => {
    const hasInBasket = basketProducts.filter(
      (pasketProduct) => pasketProduct.id === Product.id
    );
    // console.log('hasInBasket:',hasInBasket)
    // console.log('Product:',Product)
    if (hasInBasket.length === 0) {
      // console.log('hasInBasket.lenght===0:')
      if (provider !== null && Product.providerId === provider.id) {
        setBasket((prevBasket) => ({
          ...prevBasket,
          products: [...prevBasket.products, { ...Product, count: 1 }],
        }));
      } else if (provider === null) {
        setBasket((prevBasket) => ({
          ...prevBasket,
          provider: Provider,
          products: [...prevBasket.products, { ...Product, count: 1 }],
        }));
      } else {
        toast("محصولات هر سفارش باید از یک مکان باشد");
      }
    } else {
      if (provider !== null && Product.providerId === provider.id) {
        setBasket((prevBasket) => {
          const newBasket = prevBasket.products.map((p) => {
            if (p.id === Product.id) {
              return { ...p, count: p.count + 1 };
            } else {
              return { ...p };
            }
          });
          return { ...prevBasket, products: [...newBasket] };
        });
      } else {
        toast("محصولات هر سفارش باید از یک مکان باشد");
      }
      // console.log('hasInBasket.lenght>0:')
    }
  };
  const removeFromBasket = (Product) => {
    const hasInBasket = basketProducts.filter(
      (pasketProduct) => pasketProduct.id === Product.id
    );
    // console.log('hasInBasket:',hasInBasket)
    if (hasInBasket.length === 0) {
    } else {
      // console.log('hasInBasket.lenght>0:')
      setBasket((prevBasket) => {
        let newBasket = prevBasket.products.map((p) => {
          if (p.id === Product.id) {
            if (p.count - 1 === 0) {
              return null;
            } else {
              return { ...p, count: p.count - 1 };
            }
          } else {
            return { ...p };
          }
        });
        newBasket = newBasket.filter((b) => b !== null);
        let provider=prevBasket.provider;
        if(newBasket.length === 0){
          provider = null
        }
        // console.log('newBasket',newBasket)
        return { ...prevBasket, products: [...newBasket] , provider };
      });
    }
  };
  const getProductCount = (productId) => {
    const product = basketProducts.filter((p) => p.id === productId);
    return product.length > 0 ? product[0].count : 0;
  };
  const getBasketCount = () => {
    let count = 0;
    basketProducts.map((p) => (count += p.count));
    return count;
  };

  const isShow = () => {
    return show;
  };

  const setIsShow = (status) => {
    setShowBasket(status ? true : false);
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    basketProducts.map((p) => {
      totalAmount += p.count * p.price;
    });
    return totalAmount;
  };

  return {
    addToBasket,
    removeFromBasket,
    getProductCount,
    getBasketCount,
    isShow,
    setIsShow,
    getTotalAmount,
  };
}
export { useShoppingBasket, useActionShoppingBasket };
