import { PrismaClient, Contact, Prisma } from "@prisma/client";
import { useState } from "react";

interface IForm {
  firstName: string,
  lastName: string,
  email: string,
  avatar: string,
}

const initialState = {  
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
};
export default function Home({ saveContact }: { saveContact: any }) {
  const [query, setQuery] = useState<IForm>(initialState);

  const handleParam = (evt: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("saveContact", saveContact);
    const a = await saveContact(query)
    console.log('a', a)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={query.firstName}
        type="text"
        onChange={handleParam}
      />
      <input
        name="lastName"
        value={query.lastName}
        type="text"
        onChange={handleParam}
      />
      <input
        name="email"
        value={query.email}
        type="text"
        onChange={handleParam}
      />
      <input
        name="avatar"
        value={query.avatar}
        type="text"
        onChange={handleParam}
      />
      {/* {JSON.stringify(query)} */}
      <input type="submit" value="CREATE NEW EVENT" />
    </form>
  );
}

// {onSubmit({
//         firstName: Math.random().toString(),
//         lastName: Math.random().toString(),
//         email: "email",
//         avatar: "picture",
//       }
