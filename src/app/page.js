// import Image from "next/image";

import styles from "./page.module.css";
import Login from "./login/page";
import AddProduct from "./addproduct/page";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Link href="/addproduct">Add Products</Link>
      <Link href="/products">Products</Link> */}
      {/* <Login /> */}
      <Link href="/addproduct">Add Product</Link>
      <Link href="/productlist">Product List</Link>
      {/* <AddProduct /> */}
    </main>
  );
}
