import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const url = `${import.meta.env.VITE_APP_API_URL}/transactions`; // Updated to use /transactions
    const response = await fetch(url);
    const data = await response.json();
    setTransactions(data);
  };

  const addNewTransaction = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_APP_API_URL}/transaction`;
    const price = parseFloat(name.split(" ")[0]) || 0; // Parse price from input

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price,
          name: name.substring(name.indexOf(' ') + 1), // Name without price
          description,
          dateTime,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json(); // Await the new transaction response
      setName("");
      setDescription("");
      setDateTime("");
      fetchTransactions(); // Refresh transactions after adding
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const calculateBalance = () => {
    const total = transactions.reduce((acc, transaction) => acc + transaction.price, 0);
    return total.toFixed(2);
  };

  const balance = calculateBalance();
  const [integerPart, fractionPart] = balance.split(".");

  return (
    <main>
      <h1>
        Rs {integerPart}<span>.{fractionPart}</span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="+50000 for new LCD TV"
            required
          />
          <input
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            type="datetime-local"
            required
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add new Expense</button>
      </form>

      <div className="transactions">
        {transactions.map((transaction) => (
          <div key={transaction._id} className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={`price ${transaction.price < 0 ? "red" : "green"}`}>
                {transaction.price}
              </div>
              <div className="datetime">
                {new Date(transaction.dateTime).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
