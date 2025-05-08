import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { validateRoomAssignment, validateTotalRooms } from './Validations';

const RoomSchema = Yup.object().shape({
    type: Yup.string().required('Tipo es requerido'),
    accommodation: Yup.string().required('Acomodación es requerida'),
    quantity: Yup.number()
        .min(1, 'Debe ser al menos 1')
        .required('Cantidad es requerida')
});

export const RoomForm = ({ hotel, onSubmit, onCancel }) => {
    const initialValues = {
        type: '',
        accommodation: '',
        quantity: 1
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={RoomSchema}
            onSubmit={(values, actions) => {
                if (!validateRoomAssignment(values.type, values.accommodation)) {
                    actions.setFieldError('accommodation', 'Combinación tipo/acomodación inválida');
                    return;
                }

                if (!validateTotalRooms(hotel, values)) {
                    actions.setFieldError('quantity', 'Excede el número total de habitaciones del hotel');
                    return;
                }

                onSubmit(values);
                actions.resetForm();
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className="room-form">
                    <div className="form-group">
                        <label>Tipo de Habitación</label>
                        <Field as="select" name="type">
                            <option value="">Seleccione un tipo</option>
                            <option value="ESTANDAR">Estándar</option>
                            <option value="JUNIOR">Junior</option>
                            <option value="SUITE">Suite</option>
                        </Field>
                        <ErrorMessage name="type" component="div" className="error" />
                    </div>

                    <div className="form-group">
                        <label>Acomodación</label>
                        <Field as="select" name="accommodation">
                            <option value="">Seleccione una acomodación</option>
                            {values.type === 'ESTANDAR' && (
                                <>
                                    <option value="SENCILLA">Sencilla</option>
                                    <option value="DOBLE">Doble</option>
                                </>
                            )}
                            {values.type === 'JUNIOR' && (
                                <>
                                    <option value="TRIPLE">Triple</option>
                                    <option value="CUÁDRUPLE">Cuádruple</option>
                                </>
                            )}
                            {values.type === 'SUITE' && (
                                <>
                                    <option value="SENCILLA">Sencilla</option>
                                    <option value="DOBLE">Doble</option>
                                    <option value="TRIPLE">Triple</option>
                                </>
                            )}
                        </Field>
                        <ErrorMessage name="accommodation" component="div" className="error" />
                    </div>

                    <div className="form-group">
                        <label>Cantidad</label>
                        <Field type="number" name="quantity" min="1" />
                        <ErrorMessage name="quantity" component="div" className="error" />
                    </div>

                    <div className="form-actions">
                        <button type="submit">Agregar Habitación</button>
                        <button type="button" onClick={onCancel}>Cancelar</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};