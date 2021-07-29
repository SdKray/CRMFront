import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';
import {
	SELECCIONAR_CLIENTE,
	SELECCIONAR_PRODCUTO,
	CANTIDAD_PRODCUTOS,
	ACTUALIZAR_TOTAL,
} from '../../types';

const PedidoState = ({ children }) => {
	const initState = {
		cliente: {},
		productos: [],
		total: 0,
	};

	const [state, dispatch] = useReducer(PedidoReducer, initState);

	const addClient = client => {
		// console.log(client)
		dispatch({ type: SELECCIONAR_CLIENTE, payload: client });
	};

	const addProduct = productos => {
		dispatch({ type: SELECCIONAR_PRODCUTO, payload: productos });
	};

	const cantidadProductos = productosSeleccionados => {
		let nuevoState;
		// console.log('state',productosSeleccionados)
		if (state.productos.length > 0) {
			nuevoState = productosSeleccionados.map(prd => {
				const nuevoObjt = state.productos.find(
					productoState => productoState.id === prd.id
				);
				return { ...nuevoObjt, ...prd };
			});
		} else {
			nuevoState = productosSeleccionados;
		}
		// console.log('nuevoState231', nuevoState);
		dispatch({ type: CANTIDAD_PRODCUTOS, payload: nuevoState[0] });
	};

	const actualizarTotal = () => {
		dispatch({
			type: ACTUALIZAR_TOTAL,
		});
	};

	return (
		<PedidoContext.Provider
			value={{
				cliente: state.cliente,
				productos: state.productos,
				total: state.total,
				addClient,
				addProduct,
				cantidadProductos,
				actualizarTotal,
			}}>
			{children}
		</PedidoContext.Provider>
	);
};
export default PedidoState;
