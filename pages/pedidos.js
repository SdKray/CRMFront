import React from 'react';
import { Layout } from '../components/Layout';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Pedido from '../components/pedidos/Pedido';

const OBTENER_PEDIDOS = gql`
	query obtenerPedidosVendedor {
		obtenerPedidosVendedor {
			id
			cliente {
				id
				nombre
				apellido
				email
				telefono
			}
			vendedor
			estado
			total
			pedido {
				id
				cantidad
				nombre
			}
		}
	}
`;

const Pedidos = () => {
	const { data, loading, error } = useQuery(OBTENER_PEDIDOS);
	// console.log(data);
	// console.log(loading);
	// console.log(error);
	if (data === undefined) return 'Cargando...';

	const { obtenerPedidosVendedor = {} } = data;

	return (
		<div>
			<Layout>
				<h1 className='text-2xl text-gray-800 font-light'>Pedidos</h1>
				<Link href='/nuevopedido'>
					<a className='bg-blue-800 py-2 px-5 mt-3 inline-block text-white font-bold rounded text-sm hover:bg-gray-800 mb-3 uppercase'>
						Nuevo Pedido
					</a>
				</Link>
				{obtenerPedidosVendedor.lenght === 0 ? (
					<p className='mt-5 text-center text-2xl'>no Hay pedidos</p>
				) : (
					obtenerPedidosVendedor.map(pedido => (
						<Pedido key={pedido.id} pedido={pedido} />
					))
				)}
			</Layout>
		</div>
	);
};
export default Pedidos;
