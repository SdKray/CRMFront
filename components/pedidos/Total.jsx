import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';

const Total = () => {
	const pedidoContext = useContext(PedidoContext);
	const { total = 0 } = pedidoContext;
	return (
		<div className='flex items-center mt-5 justify-between bg-white p-3 '>
			<h2 className='text-gray-800 text-lg mt-0'>Total a pagar:</h2>
			<p>$ {total}</p>
		</div>
	);
};

export default Total;
