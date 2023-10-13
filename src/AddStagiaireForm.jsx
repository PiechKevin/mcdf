import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Définir le schéma de validation
const schema = z.object({
  titre: z.enum(['Monsieur', 'Madame']),
  nom: z.string(),
  prenom: z.string(),
  date_naissance: z.string(),
  fonction: z.string(),
  telephone: z.string(),
  adresse_mail: z.string().email(),
  adresse1: z.string(),
  cp: z.number(),
  ville: z.string(),
});

const AddStagiairesForm = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });
  
  const [stagiaires, setStagiaires] = useState([]);

  const addStagiaire = (data) => {
    setStagiaires([...stagiaires, data]);
    reset();
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post('/wordpress/wp-json/myplugin/v1/add_stagiaires', { stagiaires });
      if (response.status === 200) {
        alert('Stagiaires ajoutés avec succès');
      }
    } catch (error) {
      alert('Erreur lors de l\'ajout des stagiaires');
    }
  };

  return (
    <div className="container">
      <h1>Ajouter des Stagiaires</h1>
      <form onSubmit={handleSubmit(addStagiaire)}>
        {/* Titre */}
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <Controller
            name="titre"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select className="form-control" {...field}>
                <option value="" disabled>Sélectionner un titre</option>
                <option value="Monsieur">Monsieur</option>
                <option value="Madame">Madame</option>
              </select>
            )}
          />
          {errors.titre && <span className="text-danger">{errors.titre.message}</span>}
        </div>

        {/* Nom et Prénom */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Nom</label>
            <Controller
              name="nom"
              control={control}
              defaultValue=""
              render={({ field }) => <input className="form-control" type="text" {...field} />}
            />
            {errors.nom && <span className="text-danger">{errors.nom.message}</span>}
          </div>
          <div className="col">
            <label className="form-label">Prénom</label>
            <Controller
              name="prenom"
              control={control}
              defaultValue=""
              render={({ field }) => <input className="form-control" type="text" {...field} />}
            />
            {errors.prenom && <span className="text-danger">{errors.prenom.message}</span>}
          </div>
        </div>
        {/* Date de naissance */}
        <div className="mb-3">
          <label className="form-label">Date de naissance</label>
          <Controller
            name="date_naissance"
            control={control}
            defaultValue=""
            render={({ field }) => <input className="form-control" type="date" {...field} />}
          />
          {errors.date_naissance && <span className="text-danger">{errors.date_naissance.message}</span>}
        </div>
        {/* Fonction */}
        <div className="mb-3">
          <label className="form-label">Fonction</label>
          <Controller
            name="fonction"
            control={control}
            defaultValue=""
            render={({ field }) => <input className="form-control" type="text" {...field} />}
          />
          {errors.fonction && <span className="text-danger">{errors.fonction.message}</span>}
        </div>
        {/* Téléphone */}
        <div className="mb-3">
          <label className="form-label">Téléphone</label>
          <Controller
            name="telephone"
            control={control}
            defaultValue=""
            render={({ field }) => <input className="form-control" type="text" {...field} />}
          />
          {errors.telephone && <span className="text-danger">{errors.telephone.message}</span>}
        </div>
        {/* Adresse mail */}
        <div className="mb-3">
          <label className="form-label">Adresse mail</label>
          <Controller
            name="adresse_mail"
            control={control}
            defaultValue=""
            render={({ field }) => <input className="form-control" type="email" {...field} />}
          />
          {errors.adresse_mail && <span className="text-danger">{errors.adresse_mail.message}</span>}
        </div>
        {/* Adresse 1, Code postal, et Ville */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Adresse 1</label>
            <Controller
              name="adresse1"
              control={control}
              defaultValue=""
              render={({ field }) => <input className="form-control" type="text" {...field} />}
            />
            {errors.adresse1 && <span className="text-danger">{errors.adresse1.message}</span>}
          </div>
          <div className="col">
            <label className="form-label">Code postal</label>
            <Controller
              name="cp"
              control={control}
              defaultValue=""
              render={({ field }) => <input className="form-control" type="number" {...field} />}
            />
            {errors.cp && <span className="text-danger">{errors.cp.message}</span>}
          </div>
          <div className="col">
            <label className="form-label">Ville</label>
            <Controller
              name="ville"
              control={control}
              defaultValue=""
              render={({ field }) => <input className="form-control" type="text" {...field} />}
            />
            {errors.ville && <span className="text-danger">{errors.ville.message}</span>}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Ajouter Stagiaire</button>
      </form>
      <button onClick={onSubmit} className="btn btn-success mt-3">Soumettre tous les stagiaires</button>
      <ul>
        {stagiaires.map((stagiaire, index) => (
          <li key={index}>
            {stagiaire.nom} {stagiaire.prenom} {/* Affichez d'autres champs comme vous le souhaitez */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddStagiairesForm;
