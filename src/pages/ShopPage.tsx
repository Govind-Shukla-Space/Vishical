import ShopCard from '../components/ShopCard';
import "../css/shop.css";
const ShopPage = ({Data}:any) => {
  const { shops, approveShop, loading, error } = Data;
  return (
    <div className="shop-page">
      {loading && <p className="loading-msg">Loading shops...</p>}
      {error && <p className="error-msg">{error}</p>}

      <div className='card-container'>
        {shops.length === 0 ? (
          <p className="no-data">No shops available</p>
        ) : (
          shops.map((shop: any) => (
            <ShopCard key={shop.id} shop={shop} onApprove={approveShop} />
          ))
        )}
      </div>
    </div>
  )
}
export default ShopPage