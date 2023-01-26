import {useState} from 'react';
import {createClient, updateClient} from '../api/api';
import {ClientFormProps} from '../interfaces/form';
import styles from './form.module.css';

const FormClient = ({initialValues}: ClientFormProps) => {
  const [form, setForm] = useState({
    firstName: initialValues?.firstName ?? '',
    lastName: initialValues?.lastName ?? '',
    age: initialValues?.age ?? '',
    address: initialValues?.address ?? '',
  });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (initialValues) {
      updateClient(initialValues.id, form);
    } else {
      createClient(form);
    }
  };
  return (
    <div className={styles.formRegister}>
      <form onSubmit={onSubmitHandler}>
        <h4>Formulario de Registro</h4>
        <input
          className={styles.controls}
          placeholder="Ingresa Nombre"
          value={form.firstName}
          onChange={e => setForm({...form, firstName: e.currentTarget.value})}
          type="text"
          name="firstName"
        />

        <input
          className={styles.controls}
          placeholder="Ingresa el apellido"
          value={form.lastName}
          onChange={e => setForm({...form, lastName: e.currentTarget.value})}
          type="text"
          name="lastName"
        />

        <input
          className={styles.controls}
          placeholder="Ingresa la edad"
          value={form.age}
          onChange={e => setForm({...form, age: e.currentTarget.value})}
          type="text"
          name="age"
        />

        <input
          className={styles.controls}
          placeholder="Ingresa una dirección"
          value={form.address}
          onChange={e => setForm({...form, address: e.currentTarget.value})}
          type="text"
          name="address"
        />

        <input
          className={styles.button}
          type="submit"
          value={initialValues ? 'Actualizar' : 'Crear'}
        />
      </form>
    </div>
  );
};

export default FormClient;
