import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NUEVA_CUENTA = gql`
	mutation nuevoUsuario($input: UsuarioInput) {
		nuevoUsuario(input: $input) {
			id
			nombre
			apellido
			email
		}
	}
`;

// * useQuery
// const QUERY = gql`
// 	query obtenerProductos {
// 		obtenerProductos {
// 			id
// 		}
// 	}
// `;

const NuevaCuenta = () => {
	//State para el mensaje de error
	const [mensaje, guardarMensaje] = useState(null);

	//Mutation para crear nuevo usuarios
	const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

	const router = useRouter();

	//obtener productos de graphql
	// const { data, loading } = useQuery(QUERY);
	// console.log('data', data);
	// console.log('loading', loading);

	const formik = useFormik({
		initialValues: {
			nombre: '',
			apellido: '',
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required('El nombre es obligatorio'),
			apellido: Yup.string().required('El apellido es obligatorio'),
			email: Yup.string()
				.email('Email no valido')
				.required('El email es obligatorio'),
			password: Yup.string()
				.required('El password es obligatorio')
				.min(6, 'El password debe de ser al menos de 6 caracteres'),
		}),
		onSubmit: async valores => {
			const { nombre, apellido, email, password } = valores;
			try {
				const { data } = await nuevoUsuario({
					variables: {
						input: {
							nombre,
							apellido,
							email,
							password,
						},
					},
				});
				//Usuario Creado correctamente
				guardarMensaje(
					`se creo correctamente el Usuario: ${data.nuevoUsuario.nombre} `
				);
				setTimeout(() => {
					guardarMensaje(null);
					router.push('/login');
				}, 3000);
				//Redirigir usuario para inicias sesion
			} catch (error) {
				// console.log(error);
				guardarMensaje(error.message.replace('GraphQl error: ', ''));
				setTimeout(() => {
					guardarMensaje(null);
				}, 3000);
			}
		},
	});
	// if (loading) return 'Cargando...';
	const mostrarMensaje = () => {
		return (
			<div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
				<p className='font-bold'>{mensaje}</p>
			</div>
		);
	};
	return (
		<>
			<Layout>
				{mensaje && mostrarMensaje()}
				<h1 className='text-center text-2xl text-white font-light'>Login</h1>
				<div className='flex justify-center mt-5'>
					<div className='w-full max-w-sm'>
						<form
							className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
							onSubmit={formik.handleSubmit}>
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='nombre'>
									Nombre
								</label>
								<input
									type='text'
									name=''
									id='nombre'
									className='shadow apperance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
									placeholder='Nombre Usuario'
									value={formik.values.nombre}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>
							{formik.touched.nombre && formik.errors.nombre ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p className='font-bold'>Error</p>
									<p>{formik.errors.nombre}</p>
								</div>
							) : null}
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='apellido'>
									Apellido
								</label>
								<input
									type='text'
									name=''
									id='apellido'
									className='shadow apperance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
									placeholder='Apellido Usuario'
									value={formik.values.apellido}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>
							{formik.touched.apellido && formik.errors.apellido ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p className='font-bold'>Error</p>
									<p>{formik.errors.apellido}</p>
								</div>
							) : null}
							<div className='mb-4'>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='email'>
									Email
								</label>
								<input
									type='email'
									name=''
									id='email'
									className='shadow apperance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
									placeholder='Email Usuario'
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>
							{formik.touched.email && formik.errors.email ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p className='font-bold'>Error</p>
									<p>{formik.errors.email}</p>
								</div>
							) : null}
							<div>
								<label
									className='block text-gray-700 text-sm font-bold mb-2'
									htmlFor='password'>
									Password
								</label>
								<input
									type='password'
									name=''
									id='password'
									className='shadow apperance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
									placeholder='Password'
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							</div>
							{formik.touched.password && formik.errors.password ? (
								<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
									<p className='font-bold'>Error</p>
									<p>{formik.errors.password}</p>
								</div>
							) : null}
							<input
								type='submit'
								className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 '
								value='Create New Account'
							/>
						</form>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default NuevaCuenta;
