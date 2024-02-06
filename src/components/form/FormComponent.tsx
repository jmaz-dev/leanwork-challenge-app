import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";

export const formFields = [
 {
  name: "username",
  label: "Nome Completo",
  validation: {
   minLength: 3,
   errorMessage: "* Seu nome precisa conter pelo menos 3 caracteres.",
  },
 },
 {
  name: "email",
  label: "E-mail",
  validation: {
   email: true,
   errorMessage: "* Por favor, digite um e-mail válido.",
  },
 },
 {
  name: "cpf",
  label: "CPF",
  validation: {
   required: true,
   errorMessage: "* Campo obrigatório",
  },
 },
 {
  name: "tel",
  label: "Telefone",
  validation: {
   required: true,
   errorMessage: "* Campo obrigatório",
  },
 },
];

export const FormComponent = () => {
 const formSchema = z.object({
  username: z.string().min(3, {
   message: "* Mínimo 3 characters.",
  }),
  email: z.string().email({
   message: "* Digite um e-mail válido",
  }),
  cpf: z.string().refine((value) => !!value, {
   message: "* Campo obrigatório",
  }),
  tel: z.string().refine((value) => !!value, {
   message: "* Campo obrigatório",
  }),
 });

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   username: "",
   email: "",
   tel: "",
   cpf: "",
  },
 });

 function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
 }

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
    {formFields.map((field) => (
     <FormField
      key={field.name}
      control={form.control}
      name={field.name as "username" | "email" | "cpf" | "tel"}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
       <FormItem>
        <FormLabel>{field.label}</FormLabel>
        <FormControl>
         {field.name === "cpf" ? (
          <Input
           value={value}
           onBlur={onBlur}
           maxLength={14}
           onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
           placeholder="123.456.789-09"
           className="w-40 sm:w-52"
          />
         ) : field.name === "tel" ? (
          <Input
           value={value}
           onBlur={onBlur}
           maxLength={14}
           onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
           placeholder="(12) 34567-8901"
           className="w-40 sm:w-52"
          />
         ) : (
          <Input value={value} onBlur={onBlur} onChange={(e) => onChange(e.target.value)} className="w-40 sm:w-52" />
         )}
        </FormControl>
        {fieldState?.error && fieldState.isTouched && (
         <FormMessage className="text-xs">{field.validation?.errorMessage}</FormMessage>
        )}
       </FormItem>
      )}
     />
    ))}
    <div className="flex justify-between gap-3 pt-4">
     <Button type="submit" className="w-full">
      Cadastrar
     </Button>
     <Button variant="ghost">
      Login
      <span className="ml-2 mt-[2px]">
       <FaLongArrowAltRight />
      </span>
     </Button>
    </div>
   </form>
  </Form>
 );
};
