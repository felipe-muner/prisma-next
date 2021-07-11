import { PrismaClient, Contact, Prisma } from "@prisma/client";
// Prisma.ContactCreateInput
import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";

const prisma = new PrismaClient();
export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();
  return {
    props: {
      initialContacts: contacts,
    },
  };
}

export default function Home({
  initialContacts,
}: {
  initialContacts: Contact[];
}) {
  const [contacts, setContacts] = useState<any[]>(initialContacts);

  useEffect(() => {
    setContacts(initialContacts);
  }, [initialContacts]);

  const handleDelete = async () => {
    const response = await fetch("/api/felipe");
    console.log("deleted", response);
  };

  const saveContact = async (contact: Contact) => {
    const response = await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
    });
    console.log("res", response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    setContacts([json, ...contacts]);
    return json
  };

  return (
    <div>
      <button onClick={handleDelete}> empty</button>
      <ContactForm saveContact={saveContact} />
      <div>
        {contacts.map((ctt) => (
          <div key={ctt.firstName}>{ctt.firstName}</div>
        ))}
      </div>
    </div>
  );
}
