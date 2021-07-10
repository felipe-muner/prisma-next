import { PrismaClient, Contact, Prisma} from "@prisma/client";
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

export default function Home({ initialContacts }: { initialContacts: any[] }) {
  const [contacts, setContacts] = useState<any[]>(initialContacts);

  useEffect(() => {
    setContacts(initialContacts);
  }, [initialContacts]);

  async function saveContact(data: Prisma.ContactCreateInput) {
    const contact = data;
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
  }

  const handleDelete = async () => {
    const response = await fetch("/api/felipe");
    console.log("deleted", response);
  };

  return (
    <div>
      <button onClick={handleDelete}> empty</button>
      <ContactForm
        onSubmit={async (data: any, e: any) => {
          e.preventDefault();          
          console.log(data);
          try {
            await saveContact(data);
          } catch (err) {
            console.log(err);
          }
        }}
      />
      <div>
        {contacts.map((ctt) => (
          <div key={ctt.firstName}>{ctt.firstName}</div>
        ))}
      </div>
    </div>
  );
}
