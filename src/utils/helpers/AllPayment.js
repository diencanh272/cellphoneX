const AllPayment = ({ cart }) => {
    let totalPayment = 0;

    if (cart && cart.length > 0) {
        totalPayment = cart.reduce((total, item) => {
            // bỏ dấu chấm và chuyển đổi giá thành số nguyên
            const price = parseInt(item.price.replace(/\./g, ''));
            return total + price * item.quantity;
        }, 0);
    }

    const formattedTotalPayment = totalPayment.toLocaleString('vi-VN');

    return <>{`${formattedTotalPayment}₫`}</>;
};

export default AllPayment;
