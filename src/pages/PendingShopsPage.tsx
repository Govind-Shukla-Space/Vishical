import ShopCard from '../components/ShopCard';
import '../css/shop.css';

const PendingShopsPage = ({Data}:any) => {
    const { pendingShops, approveShop } = Data;
    return (
        <div className="pending-page">
            <h3>Pending Shops</h3>
            <div className="card-container">
                {pendingShops.map((shop: any) => (
                    <ShopCard key={shop.id} shop={shop} onApprove={approveShop} />
                ))}
            </div>
        </div>
    )
}

export default PendingShopsPage