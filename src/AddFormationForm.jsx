import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const AddFormationForm = () => {
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();
  
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/wordpress/wp-json/myplugin/v1/add_formation', data);
      if (response.status === 200) {
        alert('Formation ajoutée avec succès');
      }
    } catch (error) {
      alert('Erreur lors de l\'ajout de la formation');
    }
  };

  return (
    <div className="container">
        <p>Form</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input 
              className="form-control" 
              {...register('name', { 
                required: true,
                validate: value => value.trim().length >= 8 && value.trim().length <= 20
              })} 
              placeholder="Nom de la formation"
              onBlur={() => trigger('name')}
            />
            {errors.name && <span className="text-danger">Le nom doit comporter entre 8 et 20 caractères (espaces non inclus)</span>}
          </div>
          
          <div className="mb-3">
            <textarea 
              className="form-control" 
              {...register('description', { required: true })} 
              placeholder="Description"
              onBlur={() => trigger('description')}
            ></textarea>
            {errors.description && <span className="text-danger">Ce champ est requis</span>}
          </div>
          
          <button type="submit" className="btn btn-primary">Ajouter une formation</button>
        </form>
    </div>
  );
};

export default AddFormationForm;
