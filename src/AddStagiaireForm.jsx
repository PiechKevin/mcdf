/* global appLocalizer */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Notification from './components/Notification';

const validationSchema = Yup.object().shape({
    civilite: Yup.string().required('La civilité est obligatoire'),
    nom: Yup.string().required('Le nom est obligatoire'),
    prenom: Yup.string().required('Le prénom est obligatoire'),
    email: Yup.string().email('Adresse email invalide').required('L’email est obligatoire'),
    telephone: Yup.string().matches(/^[0-9]+$/, 'Le numéro de téléphone doit être numérique').required('Le téléphone est obligatoire'),
    adresse: Yup.string().required('L’adresse est obligatoire'),
    date_naissance: Yup.date().required('La date de naissance est obligatoire'),
    niveau_formation: Yup.string().required('Le niveau de formation est obligatoire'),
    situation_professionnelle: Yup.string().required('La situation professionnelle est obligatoire'),
    handicape: Yup.bool(),
});

const StagiaireForm = () => {
    const [stagiaireAdded, setStagiaireAdded] = useState({});
    const [showToast, setShowToast] = useState(false);
   
    const handleShowToast = () => {
        setShowToast(true);
    };

    const handleHideToast = () => {
        setShowToast(false);
    };
    
    const handleSubmit = (values) => {
        console.log('Form data', values);
        
        fetch(`${appLocalizer.apiUrl}mcdf/v1/stagiaires/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setStagiaireAdded(values);
            setShowToast(true); // Afficher le toast en cas de succès
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
                content="Le stagiaire a été créé avec succès."
                additionalClasses="position-fixed start-50 align-items-center text-bg-success border-0"
            />

        <Formik
            initialValues={{
                civilite: '',
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                adresse: '',
                date_naissance: '',
                niveau_formation: '',
                situation_professionnelle: '',
                handicape: false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                 <Form>
                 <div className="col-lg-3 mb-3">
                     <label htmlFor="civilite" className="form-label">Civilité</label>
                     <Field as="select" name="civilite" className={`form-select ${touched.civilite && errors.civilite ? 'is-invalid' : ''}`}>
                         <option value="" disabled>Sélectionnez votre civilité</option>
                         <option value="Madame">Madame</option>
                         <option value="Monsieur">Monsieur</option>
                     </Field>
                     <ErrorMessage name="civilite" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="mb-3">
                     <label htmlFor="nom" className="form-label">Nom</label>
                     <Field name="nom" placeholder="Nom" className={`form-control ${touched.nom && !errors.nom ? 'is-valid' : ''} ${touched.nom && errors.nom ? 'is-invalid' : ''}`} />
                     {touched.nom && !errors.nom && (
                         <div className="valid-feedback">
                             <i className="fas fa-check"></i>
                         </div>
                     )}
                     <ErrorMessage name="nom" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="mb-3">
                     <label htmlFor="prenom" className="form-label">Prénom</label>
                     <Field name="prenom" placeholder="Prénom" className={`form-control ${touched.prenom && !errors.prenom ? 'is-valid' : ''} ${touched.prenom && errors.prenom ? 'is-invalid' : ''}`} />
                     {touched.prenom && !errors.prenom && (
                         <div className="valid-feedback">
                             <i className="fas fa-check"></i>
                         </div>
                     )}
                     <ErrorMessage name="prenom" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="mb-3">
                     <label htmlFor="date_naissance" className="form-label">Date de Naissance</label>
                     <Field name="date_naissance" type="date" className={`form-control ${touched.date_naissance && !errors.date_naissance ? 'is-valid' : ''} ${touched.date_naissance && errors.date_naissance ? 'is-invalid' : ''}`} />
                     {touched.date_naissance && !errors.date_naissance && (
                         <div className="valid-feedback">
                             <i className="fas fa-check"></i>
                         </div>
                     )}
                     <ErrorMessage name="date_naissance" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="mb-3">
                     <label htmlFor="email" className="form-label">Email</label>
                     <Field name="email" type="email" placeholder="Email" className={`form-control ${touched.email && !errors.email ? 'is-valid' : ''} ${touched.email && errors.email ? 'is-invalid' : ''}`} />
                     {touched.email && !errors.email && (
                         <div className="valid-feedback">
                             <i className="fas fa-check"></i>
                         </div>
                     )}
                     <ErrorMessage name="email" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="mb-3">
                     <label htmlFor="telephone" className="form-label">Téléphone</label>
                     <Field name="telephone" placeholder="Téléphone" className={`form-control ${touched.telephone && !errors.telephone ? 'is-valid' : ''} ${touched.telephone && errors.telephone ? 'is-invalid' : ''}`} />
                     {touched.telephone && !errors.telephone && (
                         <div className="valid-feedback">
                             <i className="fas fa-check"></i>
                         </div>
                     )}
                     <ErrorMessage name="telephone" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="mb-3">
                     <label htmlFor="adresse" className="form-label">Adresse</label>
                     <Field name="adresse" as="textarea" placeholder="Adresse" className={`form-control ${touched.adresse && !errors.adresse ? 'is-valid' : ''} ${touched.adresse && errors.adresse ? 'is-invalid' : ''}`} />
                     {touched.adresse && !errors.adresse && (
                         <div className="valid-feedback">
                             <i className="fas fa-check"></i>
                         </div>
                     )}
                     <ErrorMessage name="adresse" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="mb-3">
                     <label htmlFor="niveau_formation" className="form-label">Niveau de Formation</label>
                     <Field name="niveau_formation" placeholder="Niveau de formation" className={`form-control ${touched.niveau_formation && !errors.niveau_formation ? 'is-valid' : ''} ${touched.niveau_formation && errors.niveau_formation ? 'is-invalid' : ''}`} />
                     {touched.niveau_formation && !errors.niveau_formation && (
                         <div className="valid-feedback">
                             <i className="fas fa-check"></i>
                         </div>
                     )}
                     <ErrorMessage name="niveau_formation" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="mb-3">
                     <label htmlFor="situation_professionnelle" className="form-label">Situation Professionnelle</label>
                     <Field name="situation_professionnelle" placeholder="Situation professionnelle" className={`form-control ${touched.situation_professionnelle && !errors.situation_professionnelle ? 'is-valid' : ''} ${touched.situation_professionnelle && errors.situation_professionnelle ? 'is-invalid' : ''}`} />
                     {touched.situation_professionnelle && !errors.situation_professionnelle && (
                         <div className="valid-feedback">
                             <i className="fas fa-check"></i>
                         </div>
                     )}
                     <ErrorMessage name="situation_professionnelle" component="div" className="invalid-feedback" />
                 </div>
             
                 <div className="form-check mb-3">
                     <Field name="handicape" type="checkbox" className="form-check-input" id="handicape" />
                     <label className="form-check-label" htmlFor="handicape">En situation de Handicap</label>
                 </div>
             
                 <button type="submit" className="btn btn-primary">Soumettre</button>
                 <button type="button" className="btn btn-primary" onClick={handleShowToast}>Tester le Toast</button>
             </Form>

             
         )}
     </Formik>
     </div>

 );
};

export default StagiaireForm;