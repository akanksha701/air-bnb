import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
const font = Nunito({
  subsets: ["latin"],
});

export default function Home() {
  return (
   <>
      <Navbar />
      <h1 className={font.className}>Hello World</h1>
    </>
  );
}
