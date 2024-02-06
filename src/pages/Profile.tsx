import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserContext } from "@/context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { store } from "@/classes/useLocalStorage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { LuAlertTriangle } from "react-icons/lu";
export const Profile = () => {
 const { state } = useUserContext();
 const navigate = useNavigate();
 const data = store.getItem("user");

 useEffect(() => {
  if (!state.formData && !data) {
   navigate("/");
  }
 }, [state.formData, navigate, data]);

 const onExit = () => {
  store.removeItem("user");
  navigate("/");
 };

 return (
  <section className="h-screen bg-gradient-to-b from-[#40c8f4] to-[#2179b5] flex justify-center items-center">
   <div className="flex items-center justify-center ">
    <Card className="w-[350px]">
     <CardHeader>
      <CardTitle className="inline-flex items-center gap-2">
       Parabéns {data && data.username.split(" ")[0]}!! <GiPartyPopper />
      </CardTitle>
      <CardDescription>Usuário criado com sucesso.</CardDescription>
     </CardHeader>
     <CardContent>
      <h4 className="mb-3">Confirme os dados para prosseguir:</h4>
      {data && (
       <div className="flex flex-col gap-1">
        <p>
         Nome: <span className="text-slate-500">{data?.username}</span>
        </p>
        <p>
         E-mail: <span className="text-slate-500">{data?.email}</span>
        </p>
        <p>
         CPF: <span className="text-slate-500">{data?.cpf}</span>
        </p>
        <p>
         Telefone: <span className="text-slate-500">{data?.tel}</span>
        </p>
       </div>
      )}
      <div className="mt-3">
       <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
         <AccordionTrigger className="inline-flex items-center gap-1 text-red-500">
          Aviso <LuAlertTriangle />
         </AccordionTrigger>
         <AccordionContent>
          Caso os dados não estejam de acordo clique em sair para excluir os dados e refazer o formulário
         </AccordionContent>
        </AccordionItem>
       </Accordion>

       <small></small>
      </div>
     </CardContent>
     <CardFooter className="flex justify-between gap-3">
      <Button variant="disabled" className="w-full">
       Confirmar
      </Button>
      <Button variant="ghost" onClick={() => onExit()}>
       Sair
       <FaLongArrowAltLeft className="ml-2 mt-[2px]" />
      </Button>
     </CardFooter>
    </Card>
   </div>
  </section>
 );
};
