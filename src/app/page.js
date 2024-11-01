// import Image from "next/image";

import styles from "./page.module.css";
import Login from "./login/page";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Link href="/addproduct">Add Products</Link>
      <Link href="/products">Products</Link> */}
      <Login />
    </main>
  );
}
