/* global appLocalizer */
import React, { useEffect, useState } from 'react';

const StagiairesTable = () => {
    const [stagiaires, setStagiaires] = useState([]);
    const [selectedStagiaire, setSelectedStagiaire] = useState(null);

    useEffect(() => {
        fetch(`${appLocalizer.apiUrl}mcdf/v1/stagiaires/`)
            .then(response => response.json())
            .then(data => setStagiaires(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleGeneratePdf = async (stagiaireId, fileName, templateName) => {
        try {
            const response = await fetch(`${appLocalizer.apiUrl}mcdf/v1/generate-pdf/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce
                },
                body: JSON.stringify({ stagiaireId, fileName, templateName }) // Envoyer l'ID du stagiaire
            });
    
            if (!response.ok) {
                throw new Error('Erreur de réponse du réseau');
            }
    
            const data = await response.json();
            console.log('PDF généré:', data.url);
        } catch (error) {
            console.error('Erreur lors de la génération du PDF:', error);
        }
    };
    
    

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce stagiaire ?")) {
            fetch(`${appLocalizer.apiUrl}mcdf/v1/stagiaires/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': appLocalizer.nonce
                }
            })
            .then(response => {
                console.log('Réponse du serveur:', response);  // Log pour voir la réponse du serveur
                if (response.ok) {
                    setStagiaires(stagiaires.filter(stagiaire => stagiaire.id !== id));
                } else {
                    alert("Erreur lors de la suppression du stagiaire");
                }
            })
            .catch(error => {
                console.error('Error:', error);  // Log pour voir l'erreur JavaScript
            });
        }
    };

    return (
        <div>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th className="align-middle text-center">ID</th>
                        <th className="align-middle text-center">Civilité</th>
                        <th className="align-middle text-center">Nom</th>
                        <th className="align-middle text-center">Prénom</th>
                        <th className="align-middle text-center">Email</th>
                        <th className="align-middle text-center">Téléphone</th>
                        <th className="align-middle text-center">Adresse</th>
                        <th className="align-middle text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stagiaires.map(stagiaire => (
                        <tr key={stagiaire.id}>
                            <td className="align-middle text-center">{stagiaire.id}</td>
                            <td className="align-middle text-center">{stagiaire.civilite}</td>
                            <td className="align-middle text-center">{stagiaire.nom}</td>
                            <td className="align-middle text-center">{stagiaire.prenom}</td>
                            <td className="align-middle text-center">{stagiaire.email}</td>
                            <td className="align-middle text-center">{stagiaire.telephone}</td>
                            <td className="align-middle text-center">{stagiaire.adresse}</td>
                            <td>
                                <button onClick={() => handleDelete(stagiaire.id)} className="btn btn-danger">
                                    Supprimer
                                </button>

                                <button onClick={() => handleGeneratePdf(stagiaire.id, `Convocation_Stagiaire_${stagiaire.id}.pdf`, 'convocation')} className="btn btn-primary">
                                    Sauvegarder Convocation
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StagiairesTable;
