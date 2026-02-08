import "../css/shopcard.css";
import type { Shop } from "../model/shop";
interface Props {
  shop: Shop;
  onApprove?: (id: number) => void;
};

export default function ShopCard({ shop, onApprove }: Props) {
  return (
    <div className="shop-card">
      <div className="shop-card-top">
        <h3 className="shop-name">{shop.shopName}</h3>
        <span className={`status-badge ${shop.approved ? "approved" : "pending"}`}>
          {shop.approved ? "Approved" : "Pending"}
        </span>
      </div>

      <div className="shop-details">
        <p><span>Owner</span> {shop.ownerName}</p>
        <p><span>Email</span> {shop.email}</p>
        <p><span>Phone</span> {shop.phone}</p>
        <p><span>Address</span> {shop.address}</p>
      </div>

      {!shop.approved && onApprove && (
        <button className="approve-btn" onClick={() => onApprove(shop.id)}>
          Approve Shop
        </button>
      )}
    </div>

  );
}