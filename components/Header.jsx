import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';

const OBTENER_USUARIO = gql`
	query obtenerUsuario {
		obtenerUsuario {
			id
			nombre
			apellido
		}
	}
`;
const Header = () => {
	const router = useRouter();

	const { data, loading, error } = useQuery(OBTENER_USUARIO);
	// console.log('userData', data);
	if (loading) return null;

	// if (!data.obtenerUsuario) {
	// 	return router.push('/login');
	// }

	const { nombre, apellido } = data.obtenerUsuario;

	const cerrarSesion = () => {
		localStorage.removeItem('token');

		router.push('login');
	};

	return (
		<div className='sm:flex sm:justify-between mb-6'>
			<p className='mr-2 mb-5 lg:mb-0'>
				Hola: {nombre} {apellido}
			</p>
			<button
				className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
				onClick={() => cerrarSesion()}>
				Cerrar Sesion
			</button>
		</div>
	);
};

export default Header;
