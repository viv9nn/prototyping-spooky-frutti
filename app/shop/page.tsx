import Link from "next/link";

export default function ShopPage() {
  return (
    <div className="placeholder window">
      <h1 className="page-title">Gift Shop</h1>
      <p className="coming-soon">Coming soon</p>
      <Link href="/" className="vn-choice">
        Back to the arcade
      </Link>
    </div>
  );
}
