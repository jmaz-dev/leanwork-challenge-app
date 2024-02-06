import { FormComponent } from "@/components/form/FormComponent";
export const Home = () => {
 return (
  <main className="main-layout">
   <section className="flex-1 items-center md:items-start z-10 flex justify-center">
    <aside className="hero">
     <img src="/src/assets/bg.jpg" alt="" />
     <span className="hero__overlay"></span>
    </aside>
    <div className="absolute md:relative px-8 pb-10 md:py-0 bg-white md:bg-transparent">
     <h2 className="text-2xl font-light -tracking-tighter my-10">Lean Cadastro</h2>
     <FormComponent></FormComponent>
    </div>
   </section>
  </main>
 );
};
