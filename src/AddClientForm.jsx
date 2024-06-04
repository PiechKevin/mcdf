/* global appLocalizer */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Notification from './components/Notification';

const validationSchema = Yup.object().shape({
  civilite: Yup.string().required('Ce champ est obligatoire'),
  nom: Yup.string().required('Ce champ est obligatoire'),
  prenom: Yup.string().required('Ce champ est obligatoire'),
  email: Yup.string().email('Format d\'e-mail invalide'),
  telephone: Yup.string(),
  entreprise_nom: Yup.string(),
  adresse_entreprise: Yup.string(),
  secteur_activite: Yup.string(),
  taille_entreprise: Yup.string(),
  role_client: Yup.string(),
  date_enregistrement: Yup.date()
});

const ClientForm = () => {
  const [clientAdded, setClientAdded] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleHideToast = () => {
    setShowToast(false);
  };

  const handleSubmit = (values) => {
    fetch(`${appLocalizer.apiUrl}mcdf/v1/clients/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => {
        setClientAdded(values);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 10000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Notification
        show={showToast}
        hideToast={handleHideToast}
        content="Le client a été créé avec succès."
        additionalClasses="position-fixed start-50 align-items-center text-bg-primary border-0"
      />

      <Formik
        initialValues={{
          civilite: '',
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          entreprise_nom: '',
          adresse_entreprise: '',
          secteur_activite: '',
          taille_entreprise: '',
          role_client: '',
          date_enregistrement: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="civilite" className="form-label">Civilité</label>
              <Field type="text" className={`form-control ${errors.civilite && touched.civilite ? 'is-invalid' : ''}`} name="civilite" />
              <ErrorMessage name="civilite" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Nom</label>
              <Field type="text" className={`form-control ${errors.nom && touched.nom ? 'is-invalid' : ''}`} name="nom" />
              <ErrorMessage name="nom" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">Prénom</label>
              <Field type="text" className={`form-control ${errors.prenom && touched.prenom ? 'is-invalid' : ''}`} name="prenom" />
              <ErrorMessage name="prenom" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} name="email" />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="telephone" className="form-label">Téléphone</label>
              <Field type="text" className={`form-control ${errors.telephone && touched.telephone ? 'is-invalid' : ''}`} name="telephone" />
              <ErrorMessage name="telephone" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="entreprise_nom" className="form-label">Nom de l'entreprise</label>
              <Field type="text" className={`form-control ${errors.entreprise_nom && touched.entreprise_nom ? 'is-invalid' : ''}`} name="entreprise_nom" />
              <ErrorMessage name="entreprise_nom" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="adresse_entreprise" className="form-label">Adresse de l'entreprise</label>
              <Field as="textarea" className={`form-control ${errors.adresse_entreprise && touched.adresse_entreprise ? 'is-invalid' : ''}`} name="adresse_entreprise" />
              <ErrorMessage name="adresse_entreprise" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="secteur_activite" className="form-label">Secteur d'activité</label>
              <Field type="text" className={`form-control ${errors.secteur_activite && touched.secteur_activite ? 'is-invalid' : ''}`} name="secteur_activite" />
              <ErrorMessage name="secteur_activite" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="taille_entreprise" className="form-label">Taille de l'entreprise</label>
              <Field type="text" className={`form-control ${errors.taille_entreprise && touched.taille_entreprise ? 'is-invalid' : ''}`} name="taille_entreprise" />
              <ErrorMessage name="taille_entreprise" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="role_client" className="form-label">Rôle du client</label>
              <Field type="text" className={`form-control ${errors.role_client && touched.role_client ? 'is-invalid' : ''}`} name="role_client" />
              <ErrorMessage name="role_client" component="div" className="invalid-feedback" />
            </div>

            <div className="mb-3">
              <label htmlFor="date_enregistrement" className="form-label">Date d'enregistrement</label>
              <Field type="date" className={`form-control ${errors.date_enregistrement && touched.date_enregistrement ? 'is-invalid' : ''}`} name="date_enregistrement" />
              <ErrorMessage name="date_enregistrement" component="div" className="invalid-feedback" />
            </div>

            <button type="submit" className="btn btn-primary">Enregistrer</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClientForm;