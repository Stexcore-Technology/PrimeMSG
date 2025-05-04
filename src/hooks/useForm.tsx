import { 
  $, 
  type NoSerialize, 
  type Signal,
  useComputed$, 
  useSignal, 
  useStore, 
  useTask$, 
} from "@builder.io/qwik";
import type { z } from "@builder.io/qwik-city";

/**
 * Use form hook
 * @param schemaStructure Schema structure
 * @param initialData Initial data
 * @returns Form hook
 */
export function useForm<T extends z.ZodObject<any>>(
  initialData: z.infer<T>,
  schema?: Signal<NoSerialize<T> | undefined>,
) {
  const values = useStore<z.infer<T>>(initialData);
  const errors = useStore<{ [key in keyof z.infer<T>]?: string }>({});
  const touched = useStore<{ [key in keyof z.infer<T>]?: boolean }>({});
  const valid = useSignal(false);
  
  useTask$(({ track }) => {
    // Track signals
    if(schema) track(schema);
    else track(() => schema);
    track(values);
    track(touched);
  
    if(schema) {
      if (schema.value) {
  
        // Clear errors
        Object.keys(values).forEach((key) => {
          delete errors[key as keyof T];
        });
    
        // Validate value using zod
        const parsed = schema.value.safeParse(values);
    
        if (parsed.success) {
          // form valid!
          valid.value = true;
        } else {
          // process errors
          parsed.error.errors.forEach((error) => {
            const fieldName = error.path[0] as keyof T; // Get key
            errors[fieldName] = error.message; // associate error message
          });
    
          valid.value = false;
        }
      }
      else valid.value = false;
    }
  });

  useTask$(({ track }) => {
    track(errors);

    valid.value = !Object.keys(errors).length;
  });
  

  const onChange$: any = $((_ev: any, currentTarget: any) => {
    values[currentTarget.name as keyof T] = currentTarget.value as any;
  });

  const onBlur$: any = $((_ev: any, currentTarget: any) => {
    touched[currentTarget.name as keyof T] = true;
  });

  return useComputed$(() => ({
    // State for form values
    values: values,

    // Errors after validation
    errors: errors,

    // Update form values dynamically
    handleChange: onChange$,

    // handle blur
    handleBlur: onBlur$,

    // touched inputs
    touched: touched,

    // Check if the form is valid
    isValid: valid.value,

    // Check if the form is valid
    isInvalid: !valid.value,
  }));
}

// export const useForm$ = implicit$FirstArg(useFormQrl);