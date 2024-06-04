// entry.js
import React from 'react';
import ReactDOM from 'react-dom';
import AddFormationForm from './AddFormationForm';
import AddStagiairesForm from './AddStagiaireForm';
import StagiairesTable from './GetStagiaire';
import AddSessionForm from './AddSessionForm'

import AddClientsForm from './AddClientForm';

function renderComponent() {
    // Pour le formulaire de formation
    const formationFormRoot = document.getElementById('formation-form-root');
    if (formationFormRoot) {
        ReactDOM.render(
            <React.StrictMode>
                <AddFormationForm />
            </React.StrictMode>,
            formationFormRoot
        );
    }

    // Pour le formulaire de stagiaire
    const stagiaireFormRoot = document.getElementById('stagiaire-form-root');
    if (stagiaireFormRoot) {
        ReactDOM.render(
            <React.StrictMode>
                <AddStagiairesForm />
            </React.StrictMode>,
            stagiaireFormRoot
        );
    }

    // Pour le formulaire de stagiaire
    const StagiairesTableRoot = document.getElementById('stagiaires-table-root');
    if (StagiairesTableRoot) {
        ReactDOM.render(
            <React.StrictMode>
                <StagiairesTable />
            </React.StrictMode>,
            StagiairesTableRoot
        );
    }

    // Pour le formulaire de stagiaire
    const SessionFormRoot = document.getElementById('session-form-root');
    if (SessionFormRoot) {
        ReactDOM.render(
            <React.StrictMode>
                <AddSessionForm />
            </React.StrictMode>,
            SessionFormRoot
        );
    }    
}

const clientFormRoot = document.getElementById('client-form-root');
if (clientFormRoot) {
    ReactDOM.render(
        <React.StrictMode>
            <AddClientsForm />
        </React.StrictMode>,
        clientFormRoot
    );
}



document.addEventListener('DOMContentLoaded', renderComponent);
