import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

const OBTENER_PRODUCTOS = gql`
	query obtenerProductos {
		obtenerProductos {
			id
			nombre
			existencia
			precio
		}
	}
`;

const AsignarProducto = () => {
	const [productos, setProductos] = useState([]);

	const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    const pedidoContext = useContext(PedidoContext);
	const { addProduct } = pedidoContext;

	useEffect(() => {
        addProduct(productos)
		// addClient(cliente);
	}, [productos]);

	const seleccionarProducto = productos => {
		setProductos(productos);
	};
	if (data?.obtenerProductos === undefined) return null;
	const { obtenerProductos } = data;

	return (
		<>
			<p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 font-bold text-sm'>
				2.- Asignar productos al pedido
			</p>
			<Select
				className='mt-3'
				instanceId='769'
				options={obtenerProductos}
				isMulti={true}
				onChange={opt => seleccionarProducto(opt)}
				getOptionValue={options => options.id}
				getOptionLabel={options => `${options.nombre} - ${options.existencia}`}
				placeholder='Busque o selecciones el producto'
				noOptionsMessage={() => 'no hay resultados'}
			/>
		</>
	);
};

export default AsignarProducto;
