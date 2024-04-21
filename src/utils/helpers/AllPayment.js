function AllPayment() {
    let dataCart = {};
    if (localStorage && localStorage.getItem('ProductCart')) {
        dataCart = JSON.parse(localStorage.getItem('ProductCart'));
    }
    let listCart = dataCart.listCart;

    let totalPayment = 0;
    if (listCart && listCart.length > 0) {
        totalPayment = listCart.reduce((total, product) => {
            // Chuyển đổi giá sản phẩm từ chuỗi thành số nguyên
            const price = parseInt(product.price.replace(/\./g, ''));
            return total + price * product.quantity;
        }, 0);
    }

    const formattedTotalPayment = totalPayment.toLocaleString('vi-VN');

    // console.log('Tổng thanh toán:', formattedTotalPayment);

    return <>{`${formattedTotalPayment}₫`}</>;
}

export default AllPayment;
