import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const HotelSchema = Yup.object().shape({
    name: Yup.string().required('Nombre es requerido'),
    address: Yup.string().required('Dirección es requerida'),
    city: Yup.string().required('Ciudad es requerida'),
    nit: Yup.string()
        .matches(/^[0-9]{8}-[0-9]$/, 'NIT debe tener formato 12345678-9')
        .required('NIT es requerido'),
    total_rooms: Yup.number()
        .min(1, 'Debe tener al menos 1 habitación')
        .required('Número de habitaciones es requerido')
});

export const HotelForm = ({ initialValues, onSubmit, buttonText }) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={HotelSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="hotel-form">
                    <div className="form-group">
                        <label>Nombre del Hotel</label>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>

                    <div className="form-group">
                        <label>Dirección</label>
                        <Field type="text" name="address" />
                        <ErrorMessage name="address" component="div" className="error" />
                    </div>

                    <div className="form-group">
                        <label>Ciudad</label>
                        <Field type="text" name="city" />
                        <ErrorMessage name="city" component="div" className="error" />
                    </div>

                    <div className="form-group">
                        <label>NIT</label>
                        <Field type="text" name="nit" placeholder="12345678-9" />
                        <ErrorMessage name="nit" component="div" className="error" />
                    </div>

                    <div className="form-group">
                        <label>Número Total de Habitaciones</label>
                        <Field type="number" name="total_rooms" min="1" />
                        <ErrorMessage name="total_rooms" component="div" className="error" />
                    </div>

                    <button type="submit" disabled={isSubmitting}>
                        {buttonText}
                    </button>
                </Form>
            )}
        </Formik>
    );
};