/* global appLocalizer */

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Importez Yup pour la validation des champs
import Notification from './components/Notification';

const validationSchema = Yup.object().shape({
    id_formation: Yup.number()
        .required('Ce champ est requis')
        .positive('La valeur doit être positive'),
    id_client: Yup.string()
        .required('Ce champ est requis'),
    date_debut: Yup.date()
        .required('Ce champ est requis'),
    date_fin: Yup.date()
        .required('Ce champ est requis')
        .min(Yup.ref('date_debut'), 'La date de fin doit être ultérieure à la date de début'),
    lieu: Yup.string()
        .required('Ce champ est requis'),
    statut: Yup.string()
        .required('Ce champ est requis'),
    capacite: Yup.number()
        .required('Ce champ est requis')
        .positive('La valeur doit être positive')
        .integer('La valeur doit être un entier'),
    commentaires: Yup.string()
});

const SessionForm = () => {
    const [showToast, setShowToast] = useState(false);
    const [clients, setClients] = useState([]);
    const [formations, setFormations] = useState([]);

    useEffect(() => {
        // Appel de l'API pour récupérer les clients
        fetch(`${appLocalizer.apiUrl}mcdf/v1/clients/`)
            .then(response => response.json())
            .then(data => {
                setClients(data); // Stockez les données dans l'état clients
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des clients:', error);
            });
    }, []);


    useEffect(() => {
        // Appel de l'API pour récupérer les clients
        fetch(`${appLocalizer.apiUrl}mcdf/v1/formations/`)
            .then(response => response.json())
            .then(data => {
                setFormations(data); // Stockez les données dans l'état formations
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des formations:', error);
            });
    }, []);

    const handleSubmit = (values) => {
        console.log('Données du formulaire', values);

        fetch(`${appLocalizer.apiUrl}mcdf/v1/sessions/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Succès :', data);
            setShowToast(true); // Afficher le toast en cas de succès
            setTimeout(() => setShowToast(false), 10000);
        })
        .catch((error) => {
            console.error('Erreur :', error);
        });
    };

    return (
        <div>
            <Notification 
                show={showToast} 
                hideToast={() => setShowToast(false)} 
                content="La session a été créée avec succès."
                additionalClasses="position-fixed start-50 align-items-center text-bg-primary border-0"
            />

            <Formik
                initialValues={{
                    id_formation: '',
                    id_client: '',
                    date_debut: '',
                    date_fin: '',
                    lieu: '',
                    statut: '',
                    capacite: '',
                    inscription_ouverte: true,
                    commentaires: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="id_formation">ID Client</label>
                            <Field name="id_formation" as="select" className="form-control">
                                <option value="">Sélectionnez un formation</option>
                                {formations.map(formation => (
                                    <option key={formation.id} value={formation.id}>{formation.id} - {formation.titre}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_formation" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="id_client">ID Client</label>
                            <Field name="id_client" as="select" className="form-control">
                                <option value="">Sélectionnez un client</option>
                                {clients.map(client => (
                                    <option key={client.id} value={client.id}>{client.id} - {client.nom} {client.prenom}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="id_client" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date_debut">Date de début</label>
                            <Field name="date_debut" type="date" className="form-control" />
                            <ErrorMessage name="date_debut" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date_fin">Date de fin</label>
                            <Field name="date_fin" type="date" className="form-control" />
                            <ErrorMessage name="date_fin" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lieu">Lieu</label>
                            <Field name="lieu" type="text" className="form-control" />
                            <ErrorMessage name="lieu" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="statut">Statut</label>
                            <Field name="statut" type="text" className="form-control" />
                            <ErrorMessage name="statut" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="capacite">Capacité</label>
                            <Field name="capacite" type="number" className="form-control" />
                            <ErrorMessage name="capacite" component="div" className="invalid-feedback" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="commentaires">Commentaires</label>
                            <Field name="commentaires" as="textarea" className="form-control" />
                            <ErrorMessage name="commentaires" component="div" className="invalid-feedback" />
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Soumettre</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SessionForm;
