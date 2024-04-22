import { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

const schema: ZodType<{
  nom: string,
  email: string,
  numeroTelephone: string,
  message: string
}> = z.object({
  nom: z.string().nonempty(),
  email: z.string().email(),
  numeroTelephone: z.string().min(10),
  message: z.string().min(5),
});

type FormValues = {
  nom: string,
  email: string,
  numeroTelephone: string,
  message: string
};

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      nom: '',
      email: '',
      numeroTelephone: '',
      message: '',
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const validatedData = await schema.parse(data);
      console.log('Données soumises :', validatedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Formulaire de contact</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom :</label>
          <input type="text" {...register('nom')} />
          {errors.nom && <p>{errors.nom.message}</p>}
        </div>
        <div>
          <label>Email :</label>
          <input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Numéro de téléphone :</label>
          <input type="text" {...register('numeroTelephone')} />
          {errors.numeroTelephone && <p>{errors.numeroTelephone.message}</p>}
        </div>
        <div>
          <label>Message :</label>
          <textarea {...register('message')} />
          {errors.message && <p>{errors.message.message}</p>}
        </div>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}
