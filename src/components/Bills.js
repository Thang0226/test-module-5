import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../consts/API";
import { Link } from "react-router-dom";

let products = [];
const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  products = res.data;
};
getProducts();

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [productId, setProductId] = useState(1);

  useEffect(() => {
    const getBills = async () => {
      const res = await axios.get(`${API_URL}/bills?_sort=product.price`);
      setBills(res.data);
    };
    getBills();
  }, []);

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const res = await axios.get(`${API_URL}/bills?product.id=${productId}`);
    setBills(res.data);
  };

  return (
    <div className="container mt-4">
      <h2>Bills Information</h2>
      <Link to="/create">
        <h3 className="btn btn-primary">New Bill</h3>
      </Link>
      <h3>Search Bills</h3>
      <div className="mt-1 mb-1">
        <form onSubmit={handleSearch}>
          <label>Choose your product </label>
          <br />
          <select
            name="product"
            value={productId || ""}
            onChange={(event) => handleChange(event)}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <button type="submit">Search</button>
        </form>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>No.</th>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price (USD)</th>
            <th>Product Kind</th>
            <th>Date</th>
            <th>Number</th>
            <th>Total Payment</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.id}</td>
              <td>{row.product.name}</td>
              <td>{row.product.price}</td>
              <td>{row.product.kind}</td>
              <td>{row.date}</td>
              <td>{row.number}</td>
              <td>{row.payment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
