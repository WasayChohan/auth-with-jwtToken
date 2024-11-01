import "../style.css";
export default function Page() {
  return (
    <div className="client-page">
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Price</td>
            <td>Color</td>
            <td>Company</td>
            <td>Category</td>
          </tr>
        </thead>
      </table>
    </div>
  );
}
