import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../consts/API";
import { format } from "date-fns";

let products = [];
const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  products = res.data;
};
getProducts();

export default function NewBill() {
  const [form, setForm] = useState({ product: products[0] });
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "product") {
      setForm({
        ...form,
        product: products[event.target.value - 1],
      });
    } else {
      setForm({
        ...form,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      payment: prevForm.product ? prevForm.product.price * form.number : 0,
    }));
  }, [form.product, form.number]);

  function handleSubmit() {
    const addNewBill = async (postForm) => {
      const res = await axios.post(`${API_URL}/bills`, postForm);
    };

    let postForm = form;
    postForm.date = format(new Date(postForm.date), "dd/MM/yyyy");
    addNewBill(postForm);
    alert("Add new bill successfully!");
    navigate("/");
  }

  function handleValidate() {
    const errors = {};

    if (form.date) {
      let today = new Date();
      let billDate = new Date(form.date);
      if (billDate.getDate() > today.getDate()) {
        errors.date = "Bill date cannot after today!";
      }
    }

    if (form.number <= 0) {
      errors.number = "Number > 0!";
    }

    return errors;
  }

  return (
    <div className="container mt-4">
      <h1>New Bill</h1>
      <Formik
        initialValues={form}
        validate={handleValidate}
        onSubmit={handleSubmit}
      >
        {({ errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-3 mb-3">
              <label>Choose your product </label>
              <br />
              <select
                name="product"
                value={(form.product && form.product.id) || ""}
                onChange={handleChange}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3 mb-3">
              <label>Buy Date </label>
              <br />
              <input
                type="date"
                name="date"
                value={form.date || ""}
                onChange={handleChange}
                required
              />
              {errors.date && <p className="error">{errors.date}</p>}
            </div>
            <div className="mt-3 mb-3">
              <label>Number of products </label>
              <br />
              <input
                type="number"
                name="number"
                value={form.number || ""}
                onChange={handleChange}
                required
              />
              {errors.number && <p className="error">{errors.number}</p>}
            </div>
            <div className="mt-3 mb-3">
              <label>Total payment </label>
              <br />
              <input
                type="number"
                value={form.payment || ""}
                onChange={handleChange}
                readOnly
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
