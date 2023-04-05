export interface Clients {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
}

export interface ShowClients {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  sync: boolean;
}
export interface ClientFormProps {
  initialValues?: ShowClients;
  onSubmit: () => void;
}
