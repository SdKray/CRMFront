import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_CLIENTES_USUARIO = gql`
	query obtenerClientesVendedor {
		obtenerClientesVendedor {
			id
			nombre
			empresa
			email
		}
	}
`;

const AsignarCliente = () => {
	const [cliente, setCliente] = useState([]);

	const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

	const pedidoContext = useContext(PedidoContext);
	const { addClient } = pedidoContext;

	useEffect(() => {
		addClient(cliente);
	}, [cliente]);

	const seleccionarCliente = clientes => {
		setCliente(clientes);
	};

	if (data?.obtenerClientesVendedor === undefined) return null;
	const { obtenerClientesVendedor } = data;

	return (
		<>
			<p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 font-bold text-sm'>
				1.- Asigna un cliente al pedido
			</p>
			<Select
				className='mt-3'
				instanceId='768'
				options={obtenerClientesVendedor}
				// isMulti={true}
				onChange={opt => seleccionarCliente(opt)}
				getOptionValue={options => options.id}
				getOptionLabel={options => options.nombre}
				placeholder='Busque o selecciones el cliente'
				noOptionsMessage={() => 'no hay resultados'}
			/>
		</>
	);
};

export default AsignarCliente;
