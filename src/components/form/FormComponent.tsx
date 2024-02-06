import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { formFields } from "@/classes/formFields";
import { useNavigate } from "react-router-dom";
interface FormComponent {
 isLogin: boolean;
}
export const FormComponent: React.FC<FormComponent> = ({ isLogin }) => {
 const navigate = useNavigate();

 const formSchema = z.object({
  username: z
   .string()
   .min(1, "* Campo obrigatório")
   .min(3, {
    message: "* Mínimo 3 characters.",
   })
   .transform((value) =>
    value
     ?.trim()
     .split(" ")
     .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
     .join(" ")
   ),
  email: z.string().min(1, "* Campo obrigatório").email("* Digite um e-mail válido").min(1, "* Campo obrigatório"),
  cpf: z.string().min(1, "* Campo obrigatório").min(11, "* Digite um CPF válido"),
  tel: z.string().min(1, "* Campo obrigatório").min(10, "* Digite um telefone válido"),
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

 function applyCpfMask(value: string) {
  return value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
 }

 function applyTelMask(value: string) {
  return value.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
 }

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
           onChange={(e) => onChange(applyCpfMask(e.target.value))}
          />
         ) : field.name === "tel" ? (
          <Input
           value={value}
           onBlur={onBlur}
           maxLength={14}
           onChange={(e) => onChange(applyTelMask(e.target.value))}
          />
         ) : (
          <Input value={value} onBlur={onBlur} onChange={(e) => onChange(e.target.value)} />
         )}
        </FormControl>
        {fieldState?.error && <FormMessage className="text-xs">{field.validation?.errorMessage}</FormMessage>}
       </FormItem>
      )}
     />
    ))}

    <div className="flex justify-between gap-3 pt-4">
     <Button type="submit" className="w-full">
      {isLogin ? "Entrar" : "Cadastrar"}
     </Button>
     <Button variant="ghost" type="button" onClick={() => (isLogin ? navigate("/") : navigate("/login"))}>
      {isLogin ? "Cadastrar" : "Login"}
      <span className="ml-2 mt-[2px]">
       <FaLongArrowAltRight />
      </span>
     </Button>
    </div>
   </form>
  </Form>
 );
};
