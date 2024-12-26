import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Home({ contacts, setContacts }) {
  const [search, setSearch] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen py-10">
      <div className="flex justify-between items-center py-8 max-w-5xl mx-auto px-4">
        <div className="flex items-center">
          <input
            className="px-5 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-magnifying-glass px-2 text-gray-500"></i>
        </div>

        <button className="bg-purple-500 text-white py-2 px-6 text-xl font-medium rounded-xl shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-700 transition duration-300">
          <NavLink to="/create-contact">+</NavLink>
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-purple-500 text-white">
            <tr>
              <th className="py-4 px-6 text-left text-lg">Name</th>
              <th className="py-4 px-6 text-left text-lg">Phone</th>
              <th className="py-4 px-6 text-center text-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b last:border-none hover:bg-gray-100 transition"
                >
                  <td className="py-4 px-6">{contact.name}</td>
                  <td className="py-4 px-6">{contact.phone}</td>
                  <td className="py-4 px-6 flex justify-center gap-4">
                    <button
                      onClick={() =>
                        setContacts(contacts.filter((c) => c.id !== contact.id))
                      }
                      className="bg-red-500 text-white py-1 px-4 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                    <button className="bg-green-500 text-white py-1 px-4 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 transition">
                      <NavLink
                        className="flex items-center justify-center"
                        to={`/edit-contact/${contact.id}`}
                      >
                        <i className="fa fa-pencil"></i>
                      </NavLink>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  No contacts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
