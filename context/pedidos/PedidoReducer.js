import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext';
import {
	SELECCIONAR_CLIENTE,
	SELECCIONAR_PRODCUTO,
	CANTIDAD_PRODCUTOS,
	ACTUALIZAR_TOTAL,
} from '../../types';

export default (state, action) => {
	switch (action.type) {
		case SELECCIONAR_CLIENTE:
			return { ...state, cliente: action.payload };
		case SELECCIONAR_PRODCUTO:
			return { ...state, productos: action.payload };
		case CANTIDAD_PRODCUTOS:
			return {
				...state,
				productos: state.productos.map(prd => {
					// console.log(prd.id, action.payload.id,action.payload.cantidad)
					return prd.id === action.payload.id
						? (prd = { ...action.payload })
						: prd;
				}),
			};
		case ACTUALIZAR_TOTAL:
			return {
				...state,
				total: state.productos.reduce(
					(nuevoTotal, articulo) =>
						(nuevoTotal += articulo.precio * articulo.cantidad),
					0
				),
			};
		default:
			break;
	}
};
