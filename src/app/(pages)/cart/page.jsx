"use client"
import { DecreaseQuantity, DeleteCart, IncreaseQuantity } from "@/redux/action/cartAction";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
const CartPage = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const ticketsState = useSelector((state) => state.cartReducer);
  const {carts} = ticketsState
  const ListCart = [];
  let TotalCart = 0;
  Object.keys(carts).forEach(function(item){
    TotalCart+=carts[item].quantity * carts[item].price;
    ListCart.push(carts[item]);
  })

  if(carts.length === 0) return router.push('/event')
  return (
    <>
      <h1 className="mb-10 text-center text-2xl font-bold">Tickets</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {ListCart.map((eventTicket, key) => (
            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={eventTicket.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{eventTicket.title}</h2>
                <p className="mt-1 text-xs text-gray-700">{eventTicket.name}</p>
              </div>
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                  <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => dispatch(DecreaseQuantity(key))}>-</span>
                  <span className="bg-gray-400 w-10 text-center text-xl px-1 py-1 text-white font-bold">{eventTicket.quantity}</span>
                  <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => dispatch(IncreaseQuantity(key))} >+</span>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-sm">{(eventTicket.quantity * eventTicket.price).toLocaleString('en-US')} $</p>
                  <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:text-blue-50" onClick={()=>dispatch(DeleteCart(key))}>X</span>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              {/* <p className="text-gray-700">{(price).toLocaleString('en-US')} $</p> */}
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{Number(TotalCart).toLocaleString('en-US')} $</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="transition-colors text-sm bg-blue-600 hover:bg-blue-700 p-2 rounded-sm w-full text-white text-hover shadow-md">
                  FINISH
              </button>
                  
            </div>
            <div className="flex gap-3 mt-2">
              <button className="transition-colors text-sm bg-white border border-gray-600 p-2 rounded-sm w-full text-gray-700 text-hover shadow-md">
                ADD MORE TICKET
              </button>
            </div>
            
        </div>
      </div>
    </>
    
  );
}
export default CartPage;
