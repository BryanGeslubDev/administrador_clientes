import {useEffect, useState} from 'react';
import {deleteClient} from '../api/api';
import {ShowClients} from '../interfaces/api';
import {Modal} from '../components/modal';
import FormClient from '../components/formClient';
import styles from './table.module.css';

const compareData = (a: string, b: string) => {
  return a.toLowerCase().indexOf(b.toString().toLowerCase()) >= 0;
};

const SortableTable = ({data}: {data: ShowClients[]}) => {
  const [clients, setClients] = useState(data);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [form, setForm] = useState<ShowClients>();

  const showEditClientModal = (form: ShowClients) => {
    setForm(form);
    setEditModal(true);
  };
  const showCreateClientModal = () => {
    setCreateModal(true);
  };
  const filtClientsByInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      const findClient = data.filter(client => {
        const findName = compareData(client.firstName, value);
        const findLastName = compareData(client.lastName, value);
        const findAge = compareData(client.age, value);
        const findAddress = compareData(client.address, value);
        return findName || findLastName || findAge || findAddress;
      });
      setClients(findClient);
    } else {
      setClients(data);
    }
  };

  useEffect(() => {
    setClients(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido</h1>
      <div className={styles.tableContainer}>
        <div className={styles.headerButtons}>
          <input
            type="text"
            onChange={e => {
              filtClientsByInput(e);
            }}
          />

          <button
            className={styles.addButton}
            onClick={() => showCreateClientModal()}>
            Crear nuevo cliente
          </button>
        </div>

        <table id="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>Direcciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((person: ShowClients) => {
              return (
                <tr key={person.id}>
                  <td>{person.id}</td>
                  <td>{person.firstName}</td>
                  <td>{person.lastName}</td>
                  <td>{person.age}</td>
                  <td>{person.address}</td>
                  <td>
                    <div className={styles.buttons}>
                      <button
                        className={styles.buttonEdit}
                        onClick={() => showEditClientModal(person)}>
                        Editar
                      </button>
                      <button
                        className={styles.buttonDelete}
                        onClick={() => deleteClient(person.id)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal isOpen={Boolean(editModal)} onClose={() => setEditModal(false)}>
        <FormClient initialValues={form} />
      </Modal>

      <Modal
        isOpen={Boolean(createModal)}
        onClose={() => setCreateModal(false)}>
        <FormClient />
      </Modal>
    </div>
  );
};

export default SortableTable;
