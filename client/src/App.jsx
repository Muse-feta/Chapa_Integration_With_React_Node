import { useState } from 'react'
import axios from "axios";

function App() {
  const [form, setForm] = useState({
       amount: '',
        currency: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
  })

  const handleChange =  (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }
  // console.log(form)
  const tx_ref = `${form.first_name}-${Date.now()}`
  let return_url = null

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/accept-payment",
        {
          amount: form.amount,
          currency: form.currency,
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          phone_number: form.phone_number,
          tx_ref,
          // return_url,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      window.location.href = res.data.data.checkout_url;
      console.log(res);
      setForm({
        amount: "",
        currency: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        tx_ref,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="flex items-end justify-center">
      <div>
        <h1 className="mx-[130px] mt-3 font-mono font-extrabold text-lg">
          Welcome
        </h1>
        <form
          className=" p-5 m-10 shadow-2xl rounded-xl"
          onSubmit={handleSubmit}
        
        >
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="amount"
            value={form.amount}
            placeholder="amount"
          />{" "}
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="currency"
            value={form.currency}
            placeholder="currency"
          />
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="email"
            value={form.email}
            placeholder="email"
          />
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="first_name"
            value={form.first_name}
            placeholder="first_name"
          />
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="last_name"
            placeholder="last_name"
            value={form.last_name}
          />
          <br />
          <input
            className="m-3 border border-black px-5 py-2 rounded-lg"
            onChange={handleChange}
            type="text"
            name="phone_number"
            placeholder="phone_number"
            value={form.phone_number}
          />
          <br />
          <button
            className="px-[100px] py-3 ml-3 rounded-md bg-green-600"
            type="submit"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default App
