// entry.js

import React from 'react';
import ReactDOM from 'react-dom';
import AddFormationForm from './AddFormationForm'; // Assurez-vous que le chemin est correct
import AddStagiaireForm from './AddStagiaireForm'; // Assurez-vous que le chemin est correct

// Pour le formulaire de formation
ReactDOM.render(
  <React.StrictMode>
    <AddFormationForm />
  </React.StrictMode>,
  document.getElementById('hello-world-root')
);

// Pour le formulaire de stagiaire
ReactDOM.render(
  <React.StrictMode>
    <AddStagiaireForm />
  </React.StrictMode>,
  document.getElementById('stagiaire-form-root')
);
