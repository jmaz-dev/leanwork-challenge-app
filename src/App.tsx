import { useState } from "react";
import { Button } from "@/components/ui/button";

import "./App.css";

function App() {
 const [count, setCount] = useState(0);

 return (
  <>
   <Button variant="ghost" onClick={() => setCount((count) => count + 1)}>
    count is {count}
   </Button>
  </>
 );
}

export default App;
