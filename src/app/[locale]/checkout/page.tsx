import OrderCheckout from '@/components/OrderCheckout/OrderCheckout';
import ProductPage from '@/components/ProductPage/ProductPage';

export default function CheckoutPage() {
    return (
        <ProductPage>
            <div className="flex flex-col gap-3 grow pt-5">
                <OrderCheckout />
            </div>
        </ProductPage>
    );
}
