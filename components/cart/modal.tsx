'use client';

import { Dialog, Transition } from '@headlessui/react';
import LoadingDots from 'components/loading-dots';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart, CartItem } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import ShoppingBar from 'public/shoppingbag.svg';
import { Fragment, useEffect, useOptimistic, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { redirectToCheckout } from './actions';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

type NewState = {
  itemId: string;
  newQuantity: number;
  type: 'plus' | 'minus';
};

function reducer(state: Cart | undefined, newState: NewState) {
  if (!state) {
    return state;
  }

  let updatedLines = state.lines
    .map((item: CartItem) => {
      if (item.id === newState.itemId) {
        if (newState.type === 'minus' && newState.newQuantity === 0) {
          // Remove the item if quantity becomes 0
          return null;
        }

        const singleItemAmount = Number(item.cost.totalAmount.amount) / item.quantity;
        const newTotalAmount = singleItemAmount * newState.newQuantity;

        return {
          ...item,
          quantity: newState.newQuantity,
          cost: {
            ...item.cost,
            totalAmount: {
              ...item.cost.totalAmount,
              amount: newTotalAmount.toString()
            }
          }
        };
      }
      return item;
    })
    .filter(Boolean) as CartItem[];

  const newTotalQuantity = updatedLines.reduce((sum, item) => sum + item.quantity, 0);
  const newTotalAmount = updatedLines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );

  // If there are no items left, return an empty cart
  if (updatedLines.length === 0) {
    return {
      ...state,
      lines: [],
      totalQuantity: 0,
      cost: {
        ...state.cost,
        totalAmount: {
          ...state.cost.totalAmount,
          amount: '0'
        }
      }
    };
  }

  return {
    ...state,
    lines: updatedLines,
    totalQuantity: newTotalQuantity,
    cost: {
      ...state.cost,
      totalAmount: {
        ...state.cost.totalAmount,
        amount: newTotalAmount.toString()
      }
    }
  };
}

export default function CartModal({ cart: initialCart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, updateCartItem] = useOptimistic(initialCart, reducer);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-[#2563eb] text-black backdrop-blur-xl md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Το καλάθι μου</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <Image
                    src={ShoppingBar}
                    alt="Shopping bar icon"
                    width={128}
                    height={128}
                    className="h-16"
                  />
                  <p className="mt-6 text-center text-2xl font-bold">Το καλάθι είναι άδειο</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.lines.map((item, i) => {
                      const merchandiseSearchParams = {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      });

                      const merchandiseUrl = createUrl(
                        `/product/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <li key={i} className="flex w-full flex-col border-b border-neutral-300">
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton item={item} optimisticUpdate={updateCartItem} />
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={
                                    item.merchandise.product.featuredImage.altText ||
                                    item.merchandise.product.title
                                  }
                                  src={item.merchandise.product.featuredImage.url}
                                />
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">
                                  {item.merchandise.product.title}
                                </span>
                                {item.merchandise.title !== DEFAULT_OPTION ? (
                                  <p className="text-sm text-neutral-500">
                                    {item.merchandise.title}
                                  </p>
                                ) : null}
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              {/* <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={item.cost.totalAmount.currencyCode}
                              /> */}
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200">
                                <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                  optimisticUpdate={updateCartItem}
                                />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">{item.quantity}</span>
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                      <p>Αποστολή</p>
                      <p className="text-right">Υπολογίζεται στο στάδιο πληρωμής</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
                      <p>Σύνολο</p>
                      <Price
                        className="text-right text-base text-black"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <form action={redirectToCheckout}>
                    <CheckoutButton cart={cart} />
                  </form>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

function CheckoutButton({ cart }: { cart: Cart }) {
  const { pending } = useFormStatus();

  return (
    <>
      <input type="hidden" name="url" value={cart.checkoutUrl} />
      <button
        className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
        type="submit"
        disabled={pending}
      >
        {pending ? <LoadingDots className="bg-white" /> : 'Προς το ταμείο'}
      </button>
    </>
  );
}
