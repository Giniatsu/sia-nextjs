import React from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";

const CreateOrder = () => {
  const router = useRouter();
  const { id } = router.query;

  // products should be array of ids
  const [selectedProducts, setSelectedProducts] = React.useState([])
  const [productQuantities, setProductQuantities] = React.useState({})

  const [products, setProducts] = React.useState([])
  
  const { tokens } = useAuthentication();

  React.useEffect(() => {
    if (tokens) {
      fetch(`/product_units/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => {
        setProducts(data)
      })
    }

  }, [tokens])

  React.useEffect(() => {
    // set initial product quantities to 0
    const initialProductQuantities = products.reduce((acc, product) => {
      acc[product.id] = 0
      return acc
    }, {})

    console.log(initialProductQuantities)
    setProductQuantities(initialProductQuantities)
  }, [products])

  const onSubmitForm = async (e) => {
    e.preventDefault()

    console.log('submitting form')

    console.log('creating sales order entries')
    try {
      await Promise.all(selectedProducts.map(async (productId) => {
        const quantity = productQuantities[productId]
        const newSalesOrderEntry = await fetch('/sales_order_entries/', {
          headers: {
            'Authorization': `Bearer ${tokens?.access}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({
            order_id: id,
            product_id: productId,
            quantity
          })
        }).then((res) => res.json())
        return newSalesOrderEntry
      }))

      router.push(`/sales_order/${id}`);
    } catch (err) {
      alert('Error creating order!')
    }
  }

  const onCheckProduct = (e) => {
    const { checked, name } = e.target
    const id = name.split('_')[1]

    if (checked) {
      setSelectedProducts((prev) => [...prev, id])
      setProductQuantities((prev) => ({
        ...prev,
        [id]: 1
      }))
    } else {
      setSelectedProducts(selectedProducts.filter((product) => product !== id))
      setProductQuantities((prev) => ({
        ...prev,
        [id]: 0
      }))
    }
  }

  const onQuantityChange = (e) => {
    const { value, name } = e.target

    setProductQuantities((prev) => ({
      ...prev,
      [name.split('_')[1]]: value
    }))
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form onSubmit={onSubmitForm}>
            <div className="pb-20 px-28">
              <h2 className="text-lg">UNIT OPTIONS</h2>
              <div className="flex flex-col">
                {products.map((product) => (
                  <div
                    key={`unit_${product.id}`}
                  >
                    <div>
                      <input
                        type="checkbox"
                        id={`option_${product.id}`}
                        name={`option_${product.id}`}
                        className="mr-2"
                        value={product.unit_name}
                        onChange={onCheckProduct}
                      />
                      <label for={`option_${product.id}`}>{product.unit_name}</label>
                    </div>
                    <div>
                      <label for={`quantity_${product.id}`}>Quantity: </label>
                      <input
                        type="number"
                        id={`quantity_${product.id}`}
                        name={`quantity_${product.id}`}
                        className="mr-2"
                        value={productQuantities[product.id]}
                        onChange={onQuantityChange}
                      />
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <button type="submit" className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
