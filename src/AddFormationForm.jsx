/* global appLocalizer */

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    titre: Yup.string().required('Le titre est obligatoire'),
    sous_titre: Yup.string(),
    descrip: Yup.string().required('La description est obligatoire'),
    les_plus: Yup.string(),
    modalites_positionnement: Yup.string(),
    public_cible: Yup.string().required('Le public cible est obligatoire'),
    prerequis: Yup.string(),
    modalites_prise_en_charge: Yup.string(),
    categorie_action: Yup.string(),
    prestation_realisee: Yup.string(),
    code_nfs: Yup.number(),
    modalites_delais_acces: Yup.string(),
    duree_jours: Yup.number(),
    duree_heures: Yup.number(),
    tarif_ht_h: Yup.number(),
    montant_ht: Yup.string(),
    taux_reussite: Yup.number(),
    taux_retour_enquetes: Yup.number(),
    nb_stagiaires: Yup.number(),
    taux_abandon: Yup.number(),
    taux_interruption: Yup.number(),
    taux_satisfaction: Yup.number(),
    modalites_evaluation: Yup.string(),
    methode_mobilisee: Yup.string(),
    moyens_logistiques: Yup.string(),
    accessibilite_public: Yup.string(),
    objectifs_visés: Yup.string(),
    certification_visee: Yup.string(),
    code_certif: Yup.string(),
    niveau: Yup.string(),
    code_rome: Yup.string(),
    certificateur: Yup.string(),
    formacode: Yup.string(),
    code_cpf: Yup.string(),
    code_repertoire_specifique: Yup.string(),
    code_rncp: Yup.string(),
    derniere_revision: Yup.date(),
});

const FormationForm = () => {
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (values) => {
        console.log('Données du formulaire:', values);

        fetch(`${appLocalizer.apiUrl}mcdf/v1/formations/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erreur:', error));

        // Traitement des données du formulaire
        setShowModal(true);
    };

    return (
        <div>
            <h1>Ajouter une Formation</h1>
            <Formik
                initialValues={{
                    titre: '',
                    sous_titre: '',
                    descrip: '',
                    les_plus: '',
                    modalites_positionnement: '',
                    public_cible: '',
                    prerequis: '',
                    modalites_prise_en_charge: '',
                    categorie_action: '',
                    prestation_realisee: '',
                    code_nfs: 0,
                    modalites_delais_acces: '',
                    duree_jours: 0,
                    duree_heures: 0,
                    tarif_ht_h: 0,
                    montant_ht: '',
                    taux_reussite: 0,
                    taux_retour_enquetes: 0,
                    nb_stagiaires: 0,
                    taux_abandon: 0,
                    taux_interruption: 0,
                    taux_satisfaction: 0,
                    modalites_evaluation: '',
                    methode_mobilisee: '',
                    moyens_logistiques: '',
                    accessibilite_public: '',
                    objectifs_visés: '',
                    certification_visee: '',
                    code_certif: '',
                    niveau: '',
                    code_rome: '',
                    certificateur: '',
                    formacode: '',
                    code_cpf: '',
                    code_repertoire_specifique: '',
                    code_rncp: '',
                    derniere_revision: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                  <Form>
    <div class="mb-3">
        <label for="titre" class="form-label">Titre</label>
        <Field type="text" class="form-control" id="titre" name="titre" />
        <ErrorMessage name="titre" />
    </div>

    <div class="mb-3">
        <label for="sous_titre" class="form-label">Sous-titre</label>
        <Field type="text" class="form-control" id="sous_titre" name="sous_titre" />
        <ErrorMessage name="sous_titre" />
    </div>

    <div class="mb-3">
        <label for="descrip" class="form-label">Description</label>
        <Field type="text" as="textarea" class="form-control" id="descrip" name="descrip" />
        <ErrorMessage name="descrip" />
    </div>

    <div class="mb-3">
        <label for="les_plus" class="form-label">Les Plus</label>
        <Field type="text" as="textarea" class="form-control" id="les_plus" name="les_plus" />
        <ErrorMessage name="les_plus" />
    </div>

    <div class="mb-3">
        <label for="modalites_positionnement" class="form-label">Modalités de Positionnement</label>
        <Field type="text" as="textarea" class="form-control" id="modalites_positionnement" name="modalites_positionnement" />
        <ErrorMessage name="modalites_positionnement" />
    </div>

    <div class="mb-3">
        <label for="public_cible" class="form-label">Public Cible</label>
        <Field type="text" as="textarea" class="form-control" id="public_cible" name="public_cible" />
        <ErrorMessage name="public_cible" />
    </div>

    <div class="mb-3">
        <label for="prerequis" class="form-label">Prérequis</label>
        <Field type="text" as="textarea" class="form-control" id="prerequis" name="prerequis" />
        <ErrorMessage name="prerequis" />
    </div>

    <div class="mb-3">
        <label for="modalites_prise_en_charge" class="form-label">Modalités de Prise en Charge</label>
        <Field type="text" as="textarea" class="form-control" id="modalites_prise_en_charge" name="modalites_prise_en_charge" />
        <ErrorMessage name="modalites_prise_en_charge" />
    </div>

    <div class="mb-3">
        <label for="categorie_action" class="form-label">Catégorie d'Action</label>
        <Field type="text" as="textarea" class="form-control" id="categorie_action" name="categorie_action" />
        <ErrorMessage name="categorie_action" />
    </div>

    <div class="mb-3">
        <label for="prestation_realisee" class="form-label">Prestation Réalisée</label>
        <Field type="text" as="textarea" class="form-control" id="prestation_realisee" name="prestation_realisee" />
        <ErrorMessage name="prestation_realisee" />
    </div>

    <div class="mb-3">
        <label for="code_nfs" class="form-label">Code NFS</label>
        <Field type="number" class="form-control" id="code_nfs" name="code_nfs" />
        <ErrorMessage name="code_nfs" />
    </div>

    <div class="mb-3">
        <label for="modalites_delais_acces" class="form-label">Modalités de Délais d'Accès</label>
        <Field type="text" as="textarea" class="form-control" id="modalites_delais_acces" name="modalites_delais_acces" />
        <ErrorMessage name="modalites_delais_acces" />
    </div>

    <div class="mb-3">
        <label for="duree_jours" class="form-label">Durée en Jours</label>
        <Field type="number" class="form-control" id="duree_jours" name="duree_jours" />
        <ErrorMessage name="duree_jours" />
    </div>

    <div class="mb-3">
        <label for="duree_heures" class="form-label">Durée en Heures</label>
        <Field type="number" class="form-control" id="duree_heures" name="duree_heures" />
        <ErrorMessage name="duree_heures" />
    </div>

    <div class="mb-3">
        <label for="tarif_ht_h" class="form-label">Tarif Horaire HT</label>
        <Field type="number" class="form-control" id="tarif_ht_h" name="tarif_ht_h" />
        <ErrorMessage name="tarif_ht_h" />
    </div>

    <div class="mb-3">
        <label for="montant_ht" class="form-label">Montant HT</label>
        <Field type="text" as="textarea" class="form-control" id="montant_ht" name="montant_ht" />
        <ErrorMessage name="montant_ht" />
    </div>

    <div class="mb-3">
        <label for="taux_reussite" class="form-label">Taux de Réussite</label>
        <Field type="number" class="form-control" id="taux_reussite" name="taux_reussite" />
        <ErrorMessage name="taux_reussite" />
    </div>

    <div class="mb-3">
        <label for="taux_retour_enquetes" class="form-label">Taux de Retour des Enquêtes</label>
        <Field type="number" class="form-control" id="taux_retour_enquetes" name="taux_retour_enquetes" />
        <ErrorMessage name="taux_retour_enquetes" />
    </div>

    <div class="mb-3">
        <label for="nb_stagiaires" class="form-label">Nombre de Stagiaires</label>
        <Field type="number" class="form-control" id="nb_stagiaires" name="nb_stagiaires" />
        <ErrorMessage name="nb_stagiaires" />
    </div>

    <div class="mb-3">
        <label for="taux_abandon" class="form-label">Taux d'Abandon</label>
        <Field type="number" class="form-control" id="taux_abandon" name="taux_abandon" />
        <ErrorMessage name="taux_abandon" />
    </div>

    <div class="mb-3">
        <label for="taux_interruption" class="form-label">Taux d'Interruption</label>
        <Field type="number" class="form-control" id="taux_interruption" name="taux_interruption" />
        <ErrorMessage name="taux_interruption" />
    </div>

    <div class="mb-3">
        <label for="taux_satisfaction" class="form-label">Taux de Satisfaction</label>
        <Field type="number" class="form-control" id="taux_satisfaction" name="taux_satisfaction" />
        <ErrorMessage name="taux_satisfaction" />
    </div>

    <div class="mb-3">
        <label for="modalites_evaluation" class="form-label">Modalités d'Évaluation</label>
        <Field type="text" as="textarea" class="form-control" id="modalites_evaluation" name="modalites_evaluation" />
        <ErrorMessage name="modalites_evaluation" />
    </div>

    <div class="mb-3">
        <label for="methode_mobilisee" class="form-label">Méthode Mobilisée</label>
        <Field type="text" as="textarea" class="form-control" id="methode_mobilisee" name="methode_mobilisee" />
        <ErrorMessage name="methode_mobilisee" />
    </div>

    <div class="mb-3">
        <label for="moyens_logistiques" class="form-label">Moyens Logistiques</label>
        <Field type="text" as="textarea" class="form-control" id="moyens_logistiques" name="moyens_logistiques" />
        <ErrorMessage name="moyens_logistiques" />
    </div>

    <div class="mb-3">
        <label for="accessibilite_public" class="form-label">Accessibilité du Public</label>
        <Field type="text" as="textarea" class="form-control" id="accessibilite_public" name="accessibilite_public" />
        <ErrorMessage name="accessibilite_public" />
    </div>

    <div class="mb-3">
        <label for="objectifs_visés" class="form-label">Objectifs Visés</label>
        <Field type="text" as="textarea" class="form-control" id="objectifs_visés" name="objectifs_visés" />
        <ErrorMessage name="objectifs_visés" />
    </div>

    <div class="mb-3">
        <label for="certification_visee" class="form-label">Certification Visée</label>
        <Field type="text" as="textarea" class="form-control" id="certification_visee" name="certification_visee" />
        <ErrorMessage name="certification_visee" />
    </div>

    <div class="mb-3">
        <label for="code_certif" class="form-label">Code de Certification</label>
        <Field type="text" as="textarea" class="form-control" id="code_certif" name="code_certif" />
        <ErrorMessage name="code_certif" />
    </div>

    <div class="mb-3">
        <label for="niveau" class="form-label">Niveau</label>
        <Field type="text" as="textarea" class="form-control" id="niveau" name="niveau" />
        <ErrorMessage name="niveau" />
    </div>

    <div class="mb-3">
        <label for="code_rome" class="form-label">Code ROME</label>
        <Field type="text" as="textarea" class="form-control" id="code_rome" name="code_rome" />
        <ErrorMessage name="code_rome" />
    </div>

    <div class="mb-3">
        <label for="certificateur" class="form-label">Certificateur</label>
        <Field type="text" as="textarea" class="form-control" id="certificateur" name="certificateur" />
        <ErrorMessage name="certificateur" />
    </div>

    <div class="mb-3">
        <label for="formacode" class="form-label">Formacode</label>
        <Field type="text" as="textarea" class="form-control" id="formacode" name="formacode" />
        <ErrorMessage name="formacode" />
    </div>

    <div class="mb-3">
        <label for="code_cpf" class="form-label">Code CPF</label>
        <Field type="text" as="textarea" class="form-control" id="code_cpf" name="code_cpf" />
        <ErrorMessage name="code_cpf" />
    </div>

    <div class="mb-3">
        <label for="code_repertoire_specifique" class="form-label">Code Répertoire Spécifique</label>
        <Field type="text" as="textarea" class="form-control" id="code_repertoire_specifique" name="code_repertoire_specifique" />
        <ErrorMessage name="code_repertoire_specifique" />
    </div>

    <div class="mb-3">
        <label for="code_rncp" class="form-label">Code RNCP</label>
        <Field type="text" as="textarea" class="form-control" id="code_rncp" name="code_rncp" />
        <ErrorMessage name="code_rncp" />
    </div>

    <div class="mb-3">
        <label for="derniere_revision" class="form-label">Dernière Révision</label>
        <Field type="date" class="form-control" id="derniere_revision" name="derniere_revision" />
        <ErrorMessage name="derniere_revision" />
    </div>

    <button type="submit" class="btn btn-primary">Ajouter Formation</button>
</Form>

                )}
            </Formik>

            {showModal && (
                <div className="modal">
                    <p>La formation a été ajoutée avec succès !</p>
                    <button onClick={() => setShowModal(false)}>Fermer</button>
                </div>
            )}
        </div>
    );
};

export default FormationForm;
