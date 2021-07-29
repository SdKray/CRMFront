import React, { useContext, useState } from 'react';
import { Layout } from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';
import { gql, useMutation } from '@apollo/client';

//context de pedidos de
import PedidoContext from '../context/pedidos/PedidoContext';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NUEVO_PEDIDO = gql`
	mutation nuevoPedido($input: PedidoInput) {
		nuevoPedido(input: $input) {
			id
		}
	}
`;

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

const NuevoPedido = () => {
	const router = useRouter();
	const [mensaje, setMensaje] = useState('');

	const pedidoContext = useContext(PedidoContext);
	const { cliente, productos, total } = pedidoContext;

	const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
		update(cache, { data: { nuevoPedido } }) {
			//Obtener el objteto de cache que deseamos actualizar
			const { obtenerPedidosVendedor } = cache.readQuery({
				query: OBTENER_PEDIDOS,
			});
			// reescribimos el cache (el cache nunca se debe modificar)
			cache.writeQuery({
				query: OBTENER_PEDIDOS,
				data: {
					obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido],
				},
			});
		},
	});

	const vaidarPedido = () => {
		return !productos.every(producto => producto.cantidad > 0) ||
			total === 0 ||
			cliente.length === 0
			? 'opacity-50 cursor-not-allow'
			: '';
	};

	const crearNuevoPedido = async () => {
		const { id } = cliente;
		//Remover lo no deseado
		const pedido = productos.map(
			({ __typename, existencia, ...producto }) => producto
		);
		try {
			const data = await nuevoPedido({
				variables: {
					input: {
						cliente: id,
						total,
						pedido,
					},
				},
			});
			router.push('/pedidos');
			Swal.fire('Correcto', 'El pedido se registro correctamente', 'success');
		} catch (error) {
			setMensaje(error.message.replace('Error: ', ''));
		}
	};

	const mostrarMensaje = () => {
		return (
			<div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
				<p className='font-bold'>{mensaje}</p>
			</div>
		);
	};

	return (
		<Layout>
			<h1 className='text-2xl text-gray-800 font-light'>Nuevo Pedido</h1>
			{mensaje && mostrarMensaje()}
			<div className='flex justify-center mt-5'>
				<div className='w-full max-w-lg'>
					<AsignarCliente />
					<AsignarProducto />
					<ResumenPedido />
					<Total />
					<button
						type='button'
						className={`bg-gray-700 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${vaidarPedido()}  `}
						onClick={() => crearNuevoPedido()}>
						Registar pedido
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default NuevoPedido;
