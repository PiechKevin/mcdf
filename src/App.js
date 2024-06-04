import React from 'react';
import 'animate.css/animate.min.css';
import './tailwind.output.css';
import AddFormationForm from './AddFormationForm'; // Assurez-vous que le chemin est correct
import AddStagiairesForm from './AddStagiaireForm';
import AddClientsForm from './AddClientForm';

import StagiairesTable from './GetStagiaire';
import AddSessionForm from './AddSessionForm'


function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'cupcake');
  }, []);

  return (
    <div className="App">
      <AddFormationForm />
      <AddStagiairesForm />
      <AddSessionForm />
      <StagiairesTable />
      <AddClientsForm />
    </div>
  );
}

export default App;
