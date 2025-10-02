import { clearCart } from "../Utils/cartSlice";
import ItemList from "./ItemList";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div>
        <div className="text-center capitalize">
          <h1 className="text-3xl font-heading-1 m-4">Cart</h1>
          {cartItems.length ? (
            <button
              className="font-body bg-brand-500 text-white hover:bg-brand-400 rounded-3xl py-2 px-4"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          ) : null}
        </div>
      </div>
      <div className="w-full flex flex-wrap items-center justify-center leading-6">
        <div className="w-[95%] xl:w-1/2 border-2 border-neutral-200 shadow-md rounded-sm mx-4 my-6 p-4 list-none no-underline flex flex-col items-center justify-center">
          {cartItems.length ? (
            <ItemList items={cartItems} />
          ) : (
            <h3 className="text-lg text-neutral-600">
              No items in the Cart, Please add some items!
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
