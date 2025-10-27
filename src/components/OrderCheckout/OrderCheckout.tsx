import Button from "../Button/Button";

export default function OrderCheckout({ onClick }: { onClick: VoidFunction }) {
    return (
        <div>
            <div></div>
            <div></div>
            <Button onClick={onClick}>Complete Order</Button>
        </div>
    );
}