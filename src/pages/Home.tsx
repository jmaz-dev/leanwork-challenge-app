import { FormComponent } from "@/components/form/FormComponent";
import { useUserContext } from "@/context/UserContext";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const Home = () => {
 const location = useLocation();
 const [isLoginPage, setIsLoginPage] = useState(false);
 const { state } = useUserContext();

 useEffect(() => {
  console.log(state);

  if (location.pathname === "/login") {
   setIsLoginPage(true);
  } else {
   setIsLoginPage(false);
  }
 }, [location, state]);

 return (
  <main className="main-layout">
   <section className="flex-1 items-center md:items-start z-10 flex justify-center">
    <aside className="hero">
     <img src="/src/assets/bg.jpg" alt="" />
     <span className="hero__overlay"></span>
    </aside>
    <div className="absolute md:relative px-8 pb-10 md:py-0 bg-white md:bg-transparent">
     <h2 className="text-2xl font-light -tracking-tighter my-10">Lean {!isLoginPage ? "Cadastro" : "Login"}</h2>
     <FormComponent isLogin={isLoginPage} />
    </div>
   </section>
  </main>
 );
};
