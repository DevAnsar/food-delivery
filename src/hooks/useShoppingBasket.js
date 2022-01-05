import { useContext } from "react";
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
  const basket = context.basket;
  const show = context.showBasket;
  const setShowBasket = context.setShowBasket;

  const addToBasket = (Product) => {
    const hasInBasket = basket.filter(
      (pasketProduct) => pasketProduct.id === Product.id
    );
    // console.log('hasInBasket:',hasInBasket)
    // console.log('Product:',Product)
    if (hasInBasket.length === 0) {
      // console.log('hasInBasket.lenght===0:')
      setBasket((prevBasket) => [...prevBasket, { ...Product, count: 1 }]);
    } else {
      // console.log('hasInBasket.lenght>0:')
      setBasket((prevBasket) => {
        const newBasket = prevBasket.map((p) => {
          if (p.id === Product.id) {
            return { ...p, count: p.count + 1 };
          } else {
            return { ...p };
          }
        });
        return [...newBasket];
      });
    }
  };
  const removeFromBasket = (Product) => {
    const hasInBasket = basket.filter(
      (pasketProduct) => pasketProduct.id === Product.id
    );
    // console.log('hasInBasket:',hasInBasket)
    if (hasInBasket.length === 0) {
    } else {
      // console.log('hasInBasket.lenght>0:')
      setBasket((prevBasket) => {
        let newBasket = prevBasket.map((p) => {
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
        // console.log('newBasket',newBasket)
        return [...newBasket];
      });
    }
  };
  const getProductCount = (productId) => {
    const product = basket.filter((p) => p.id === productId);
    return product.length > 0 ? product[0].count : 0;
  };
  const getBasketCount = () => {
    let count = 0;
    basket.map((p) => (count += p.count));
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
    basket.map((p) => {
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
