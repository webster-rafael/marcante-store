import { IoMdTrash } from "react-icons/io";
import { useCart } from "../store/useCart";
import axios from "axios";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useEffect, useState } from "react";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
}

const Cart = () => {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const {
    cart,
    calculateTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const frete = 40;
  const desconto = 0;

  useEffect(() => {
    initMercadoPago("APP_USR-2b905b0b-ae54-4657-8920-f11beb069ce1", {
      locale: "pt-BR",
    });
  }, []);

  const createPreference = async (items: CartItem[], total: number) => {
    try {
      const response = await axios.post(
        "https://server-marcante.vercel.app/create_preference",
        {
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity ?? 1,
            price: Number(item.price),
          })),
          total_amount: total,
        }
      );

      console.log("Create Preference Response:", response.data);

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const subtotal = calculateTotal();
    const total_amount = subtotal;
    console.log("Subtotal:", subtotal);

    const id = await createPreference(
      cart.map((item) => ({
        name: item.name,
        quantity: item.quantity ?? 1,
        price: item.price,
      })),
      total_amount
    );

    if (id) {
      setPreferenceId(id);
    }
  };

  useEffect(() => {
    if (cart.length > 0) {
      handleBuy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  return (
    <main className="w-full max-w-[1200px] h-full mt-20 mx-auto font-franklin text-zinc-50 flex flex-col gap-10">
      <section className="w-full h-full max-w-[1200px] my-10 shadow-md shadow-black/20 rounded-lg mx-auto text-black">
        <div className="w-full bg-zinc-100 max-w-[1200px] mx-auto flex flex-col border py-5">
          <div className="w-[90%] mx-auto flex justify-between items-center text-black/70">
            <h1 className="uppercase font-semibold">Produto</h1>
            <h1 className="uppercase font-semibold hidden sm:block">QTD</h1>
            <h1 className="uppercase font-semibold">Subtotal</h1>
          </div>

          {cart.length > 0 ? (
            cart.map((produto) => (
              <div
                key={produto.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-8 mt-5 border-b py-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex justify-between w-full items-center">
                    <img
                      src={produto.images[0].src}
                      className="size-20 sm:size-28 rounded-full border border-purple-300"
                      alt={produto.name}
                    />

                    <button onClick={() => removeFromCart(produto.id)}>
                      <IoMdTrash className="text-red-600 hover:scale-110 size-7" />
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <h1 className="text-sm sm:text-basefont-semibold text-black/70">
                      {produto.name}
                    </h1>
                    <span className="font-bold text-lg">
                      {Number(produto.price).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:w-[55%]">
                  <div className="w-auto h-20 flex items-center gap-1">
                    <button
                      onClick={() => decreaseQuantity(produto.id)}
                      className="flex size-6 justify-center items-center bg-violet-500 border-none appearance-none rounded-full text-white text-sm"
                    >
                      -
                    </button>
                    <input
                      value={produto.quantity}
                      className="w-16 pl-4 flex items-center bg-transparent border rounded focus:outline-none px-1 font-bold text-center"
                      type="number"
                      readOnly
                    />
                    <button
                      onClick={() => increaseQuantity(produto.id)}
                      className="flex size-6 justify-center items-center bg-violet-500 border-none appearance-none rounded-full text-white text-sm"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-xl">
                    {(produto.price * (produto.quantity ?? 1)).toLocaleString(
                      "pt-BR",
                      {
                        style: "currency",
                        currency: "BRL",
                      }
                    )}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-black/70">
              Seu carrinho está vazio.
            </div>
          )}

          <section className="w-full h-full flex flex-col gap-3 py-1 px-2 mt-5">
            <div className="w-full flex border items-center justify-center h-14 rounded-lg">
              <input
                className="appearance-none font-medium h-full w-full rounded-l-lg px-3"
                placeholder="Digite seu cupom"
                type="text"
              />
              <button className="bg-purple-600 h-full text-white font-medium px-8 rounded-r-lg">
                Aplicar
              </button>
            </div>
            <div className="flex items-center justify-center w-full h-40 p-3 border">
              <table className="w-full flex flex-col gap-2">
                <thead className="w-full flex justify-between">
                  <tr className="w-full flex justify-between">
                    <th className="font-normal text-zinc-600">
                      Items ({cart.length})
                    </th>
                    <th className="font-normal">
                      {calculateTotal().toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="w-full flex justify-between">
                    <td className="font-normal text-zinc-600">Envio</td>
                    <td>
                      {cart.length === 0
                        ? (0).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : frete.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                    </td>
                  </tr>
                  <tr className="w-full flex justify-between">
                    <td className="font-normal text-zinc-600">Cupom</td>
                    <td>
                      {" "}
                      -{" "}
                      {cart.length === 0
                        ? (0).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : desconto.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="w-full flex justify-between">
                    <td className="font-medium text-zinc-600">Preço Total</td>
                    <td className="font-medium text-azul">
                      {cart.length === 0
                        ? (0).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : (calculateTotal() + frete - desconto).toLocaleString(
                            "pt-BR",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mercado-pago-container">
              {preferenceId ? (
                <Wallet
                  initialization={{ preferenceId }}
                  customization={{ texts: { valueProp: "smart_option" } }}
                />
              ) : (
                <div className="skeleton-button"></div> // Skeleton enquanto o botão não carrega
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Cart;
