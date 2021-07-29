import React from 'react';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'Yup';
import Swal from 'sweetalert2';

const OBTENER_PRODUCTO = gql`
	query obtenerProducto($id: ID!) {
		obtenerProducto(id: $id) {
			id
			nombre
			existencia
			precio
		}
	}
`;

const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($id: ID!, $input: ProductoInput) {
		actualizarProducto(id: $id, input: $input) {
			id
			nombre
			existencia
			creado
		}
	}
`;

const EditarProducto = () => {
	const router = useRouter();
	const {
		query: { pid },
	} = router;

	const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
		variables: { id: pid },
	});
	const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

	//schema de validationSchema

	const schemaValidacion = Yup.object({
		nombre: Yup.string().required('Nombre Obligatorio'),
		existencia: Yup.number()
			.required('El stock es obligatorio')
			.positive('No se aceptan negativos')
			.integer('La existencia deben ser numeros enteros'),
		precio: Yup.number()
			.required('El precio es obligatorio')
			.positive('No se aceptan numeros negativos'),
	});
	if (data === undefined) return 'Cargando...';

	const { obtenerProducto } = data;

	const actualizarInfoProducto = async valores => {
		const { nombre, existencia, precio} = valores;
		console.log(valores);
		try {
			const { data } = await actualizarProducto({
				variables: {
					id: pid,
					input: {
						nombre,
						existencia,
						precio,
					},
				},
			});
			//TODO: sweet alert
			Swal.fire('update', 'Producto Actualizado correctamente', 'success');
			//TODO: redireccionar
			router.push('/productos');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<h1 className='text-2xl text-gray-800 font-light'>Editar Cliente</h1>
			{/* {mensaje && mostrarMensaje()} */}
			<div className='flex justify-center mt-5'>
				<div className='w-full max-w-lg'>
					<Formik
						validationSchema={schemaValidacion}
						enableReinitialize
						initialValues={obtenerProducto}
						onSubmit={valores => {
							actualizarInfoProducto(valores);
						}}>
						{props => {
							return (
								<form
									className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'
									onSubmit={props.handleSubmit}>
									<div className='mb-4'>
										<label
											className='block text-gray-700 text-sm font-bold mb-2'
											htmlFor='nombre'>
											Nombre
										</label>
										<input
											type='text'
											id='nombre'
											className='shadow apperance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
											placeholder='Nombre Producto'
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.nombre}
										/>
									</div>
									{props.touched.nombre && props.errors.nombre ? (
										<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
											<p className='font-bold'>Error</p>
											<p>{props.errors.nombre}</p>
										</div>
									) : null}
									<div className='mb-4'>
										<label
											className='block text-gray-700 text-sm font-bold mb-2'
											htmlFor='existencia'>
											Existencia
										</label>
										<input
											type='number'
											id='existencia'
											className='shadow apperance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
											placeholder='Cantidad Disponible'
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.existencia}
										/>
									</div>
									{props.touched.existencia && props.errors.existencia ? (
										<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
											<p className='font-bold'>Error</p>
											<p>{props.errors.existencia}</p>
										</div>
									) : null}
									<div className='mb-4'>
										<label
											className='block text-gray-700 text-sm font-bold mb-2'
											htmlFor='precio'>
											Precio
										</label>
										<input
											type='number'
											id='precio'
											className='shadow apperance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  '
											placeholder='Precio'
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.precio}
										/>
									</div>
									{props.touched.precio && props.errors.precio ? (
										<div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
											<p className='font-bold'>Error</p>
											<p>{props.errors.precio}</p>
										</div>
									) : null}
									<input
										type='submit'
										className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 '
										value='Editar Producto'
									/>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default EditarProducto;
