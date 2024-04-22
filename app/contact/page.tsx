import { useForm, SubmitHandler } from 'react-hook-form';
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
    },
    resolver:
      async (data) => {
        try {
          const validatedData = await schema.parse(data);
          return {
            values: validatedData,
            errors: {}
          };
        } catch (error) {
          if (error !== null && typeof error === 'object' && 'formErrors' in error) {
      
            const errorWithFormErrors = error as { formErrors: any };

            return {
              values: {},
              errors: errorWithFormErrors.formErrors
            };
          } else {

            const errorMessage: string = error as string;
            console.error(errorMessage); 
            return {
              values: {},
              errors: {} 
            };
          }
        }
      }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {

    console.log('Données soumises :', data);
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
