import useGetInputValues from "../hooks/useGetInputValues";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateContact({ setContacts, contacts }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const { values, handleChange, resetHandler } = useGetInputValues({
        name: "",
        phone: "",
    });

    useEffect(() => {
        if (location.pathname !== "/create-contact") {
            const contact = contacts.find((c) => c.id === parseInt(id));
            handleChange({ target: { name: "name", value: contact.name } });
            handleChange({ target: { name: "phone", value: contact.phone } });
        }
    }, []);

    const bosilganda = useCallback((e) => {
        e.preventDefault();
        const a = new FormData(e.target);

        if (location.pathname === "/create-contact") {
            const contact = {
                id: Date.now(),
                name: a.get("name"),
                phone: a.get("phone"),
            };
            setContacts([...contacts, contact]);
        } else {
            const contact = {
                id: parseInt(id),
                name: a.get("name"),
                phone: a.get("phone"),
            };

            const updatedContacts = contacts.map((c) =>
                c.id === contact.id ? contact : c
            );

            setContacts(updatedContacts);
        }

        navigate("/");
    });

    return (
        <div className="flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen p-10">
            <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-md">
                {location.pathname === "/create-contact" ? "Add" : "Edit"} Contact
            </h1>
            <form
                className="flex flex-col items-center bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full"
                onSubmit={bosilganda}
            >
                <input
                    className="w-full h-14 p-4 mb-6 rounded-lg bg-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-500 transition duration-300 placeholder-gray-500"
                    type="text"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                />
                <input
                    className="w-full h-14 p-4 mb-6 rounded-lg bg-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-500 transition duration-300 placeholder-gray-500"
                    type="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    name="phone"
                />
                <button
                    type="submit"
                    className="bg-purple-500 text-white py-3 px-8 rounded-full font-medium shadow-md transition duration-300 transform hover:scale-105 hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-700"
                >
                    {location.pathname === "/create-contact" ? "Add" : "Edit"}
                </button>
            </form>
        </div>
    );
}