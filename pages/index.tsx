import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
const prisma = new PrismaClient();

export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();
  return {
    props: {
      initialContacts: contacts,
    },
  };
}

export default function Home({ initialContacts }: { initialContacts: any[] }) {
  const [contacts, setContacts] = useState<any[]>(initialContacts);

  useEffect(() => {
    setContacts(initialContacts);
  }, [initialContacts]);

  async function saveContact() {
    const contact = {
      firstName: Math.random().toString(),
      lastName: Math.random().toString(),
      email: "email",
      avatar: "picture",
    };
    const response = await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    console.log(json)
    setContacts([...contacts, json]);
  }

  return (
    <div>
      <div>{contacts.map(ctt => <div key={ctt.firstName}>{ctt.firstName}</div>)}</div>
      <button onClick={saveContact}>new contact</button>
    </div>
  );
}
