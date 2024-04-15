// function RenderPageNumber() {
//     $(".pagination").empty();
//     // total page
//     var rowPage = Math.ceil(listProductData.length / productPerPage);
//     //console.log(rowPage);
//     for (i = 1; i <= rowPage; i++) {
//         $(".pagination").append(`
//                     <li class="pagination__item" onclick = "changePage(${i})">
//                         ${i}
//                     </li>
//             `);

//         if (currentPage === i) {
//             $(".pagination__item").addClass("active-page");
//         }
//     }

//     $(".pagination__item")
//         .not(`:nth-child(${currentPage})`)
//         .removeClass("active-page");

//     // change current page
//     changePage = (page) => {
//         currentPage = page;
//         sliceProductPage = listProductData.slice(
//             (currentPage - 1) * productPerPage,
//             currentPage * productPerPage
//         );
//         renderPageNumber();
//         renderProductPageData();
//     };
// }

//     export default RenderPageNumber
