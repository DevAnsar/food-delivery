import { useContext } from "react";
import toast from "react-hot-toast";
import { AddressContext } from "../providers";
function useAddress() {
  const context = useContext(AddressContext);

  if (context === undefined)
    throw new Error("useShoppingBasket must be within AddressProvider!");

  return context;
}
function useAllAddress() {
  const context = useAddress();

  return [context.allAddress, context.setAllAddress];
}

function useSelectedAddress() {
  const context = useAddress();

  return [context.address, context.setAddress];
}
export { useAddress, useAllAddress, useSelectedAddress };
