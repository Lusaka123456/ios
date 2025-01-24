import React, { useState } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [contacts, setContacts] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://supreme-telegram-965gjvj97x727p5r-5000.app.github.dev/api/contact", form);
      alert("Message sent!");
      setForm({ name: "", email: "", message: "" });
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get("https://supreme-telegram-965gjvj97x727p5r-5000.app.github.dev/api/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          required
        />
        <button type="submit">Send</button>
      </form>
      <button onClick={fetchContacts}>Load Messages</button>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} ({contact.email}): {contact.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
