import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import SortableTable from './table';
import {ShowClients} from '../interfaces/api';

describe('SortableTable', () => {
  const data: ShowClients[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      age: '30',
      address: '123 Main St',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      age: '25',
      address: '456 Elm St',
    },
  ];

  it('renderizado de tabla y clientes', () => {
    render(<SortableTable data={data} />);
    const idHeader = screen.getByText('ID');
    const nameHeader = screen.getByText('Nombre');
    const ageHeader = screen.getByText('Edad');
    const addressHeader = screen.getByText('Direcciones');
    expect(idHeader).toBeInTheDocument();
    expect(nameHeader).toBeInTheDocument();
    expect(ageHeader).toBeInTheDocument();
    expect(addressHeader).toBeInTheDocument();
    const johnRow = screen.getByText('John');
    const doeRow = screen.getByText('Doe');
    const age30Row = screen.getByText('30');
    const mainStRow = screen.getByText('123 Main St');
    expect(johnRow).toBeInTheDocument();
    expect(doeRow).toBeInTheDocument();
    expect(age30Row).toBeInTheDocument();
    expect(mainStRow).toBeInTheDocument();
  });

  it('filtrado de clientes basado en un input', () => {
    render(<SortableTable data={data} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'Jane'}});
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.queryByText('John')).not.toBeInTheDocument();
    expect(screen.queryByText('Doe')).not.toBeInTheDocument();
    fireEvent.change(input, {target: {value: ''}});
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
  });
});
