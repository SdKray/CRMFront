import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';
import ProductoResumen from './ProductoResumen';

const ResumenPedido = () => {
	const pedidoContext = useContext(PedidoContext);
	const { productos } = pedidoContext;
	// console.log(productos);

	return (
		<>
			<p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 font-bold text-sm'>
				3.- Ajusta las cantidades del producto
			</p>
			{productos.length > 0 ? (
				<>
					{productos.map(prd => (
						<ProductoResumen key={prd.id} producto={prd} />
					))}
				</>
			) : (
				<>
					<p className='mt-5 text-sm'>no hay productos</p>
				</>
			)}
		</>
	);
};

export default ResumenPedido;
