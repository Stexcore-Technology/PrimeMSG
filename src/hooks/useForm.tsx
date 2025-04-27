import { $, NoSerialize, noSerialize, QRL, QRLEventHandlerMulti, useComputed$, useSignal, useStore, useTask$, useVisibleTask$, implicit$FirstArg } from "@builder.io/qwik";
import { z, zod$, zodQrl } from "@builder.io/qwik-city";

export function useFormQrl<T extends z.ZodObject<any>>(
  schemaStructure: QRL<T>,
  initialData: z.infer<T>,
) {
  const schema = useSignal<NoSerialize<T>>();
  const values = useStore<z.infer<T>>(initialData);
  const errors = useStore<{ [key in keyof z.infer<T>]?: string }>({});
  const touched = useStore<{ [key in keyof z.infer<T>]?: boolean }>({});
  const valid = useSignal(false);

  useVisibleTask$(async () => {
    const schemaObj = await schemaStructure.resolve();
    schema.value = noSerialize(schemaObj);
  });
  
  useTask$(({ track }) => {
    // Rastrear cambios en las variables importantes
    track(values);
    track(touched);
  
    if (schema.value) {
      // Limpiar errores previos
      Object.keys(values).forEach((key) => {
        delete errors[key as keyof T];
      });
  
      // Validar los valores actuales usando Zod
      const parsed = schema.value.safeParse(values);
  
      if (parsed.success) {
        // Si la validación es exitosa, el formulario es válido
        valid.value = true;
      } else {
        // Si hay errores, procesarlos
        parsed.error.errors.forEach((error) => {
          const fieldName = error.path[0] as keyof T; // Obtener el nombre del campo
          errors[fieldName] = error.message; // Asociar el mensaje de error al campo
        });
  
        valid.value = false;
      }
    }
  });
  

  const onChange$: QRLEventHandlerMulti<Event, HTMLInputElement> = $((_ev, currentTarget) => {
    values[currentTarget.name as keyof T] = currentTarget.value as any;
    console.log(values);
  });

  const onBlur$: QRLEventHandlerMulti<FocusEvent, HTMLInputElement> = $((_ev, currentTarget) => {
    touched[currentTarget.name as keyof T] = true;
  });

  return useComputed$(() => ({
    // State for form values
    values: values,

    // Errors after validation
    errors: errors,

    // Update form values dynamically
    handleChange: onChange$,

    handleBlur: onBlur$,

    touched: touched,

    // Check if the form is valid
    isValid: valid.value,

    // Check if the form is valid
    isInvalid: !valid.value,
  }));
}

export const useForm$ = implicit$FirstArg(useFormQrl);