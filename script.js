// let keranjang = [
//   {
//     image: "img/1.jpg",
//     title: "PANADOL",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident veritatis eaque molestiae omnis perspiciatis fugit ullam ipsa voluptatibus repellat aut. Lorem ipsum dolor.",
//     price: "12000",
//     qty: 4,
//   },
//   {
//     image: "img/2.jpg",
//     title: "PROCOLD",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident veritatis eaque molestiae omnis perspiciatis fugit ullam ipsa voluptatibus repellat aut. Lorem ipsum dolor.",
//     price: "12000",
//     qty: 1,
//   },
//   {
//     image: "img/3.jpg",
//     title: "BODREXIN",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident veritatis eaque molestiae omnis perspiciatis fugit ullam ipsa voluptatibus repellat aut. Lorem ipsum dolor.",
//     price: "12000",
//     qty: 3,
//   },
//   {
//     image: "img/4.jpg",
//     title: "INSTO",
//     desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident veritatis eaque molestiae omnis perspiciatis fugit ullam ipsa voluptatibus repellat aut. Lorem ipsum dolor.",
//     price: "12000",
//     qty: 3,
//   },
// ];

let keranjang = [];

const btnCart = document.querySelector(".btn-cart");

function valueCart(off, del) {
  const valueCart = document.querySelector(".badge-value");
  let a = 0;
  keranjang.forEach((e) => {
    a += e.qty;
  });

  if (off == "first") {
  } else {
    Swal.fire({
      title: del ? "Produk telah berhasil dihapus " : "Produk telah berhasil ditambahkan",
      text: del ? "Produk telah dihapus dari keranjang" : "Produk telah ditambahkan dari keranjang",
      icon: "success",
      confirmButtonText: "Close",
    });
  }

  valueCart.innerText = a;
}

valueCart("first");

function tambahProduk(card) {
  const img = card.querySelector("img").getAttribute("src");
  const title = card.querySelector(".title-product").innerText;
  const desc = card.querySelector("p").innerText;
  const price = card.querySelector(".price").dataset.price;
  const qty = card.querySelector("input").value;

  keranjang.push({
    image: img,
    title: title,
    desc: desc,
    price: price,
    qty: parseInt(qty),
  });
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart")) {
    const card = e.target.parentElement.parentElement.parentElement;
    const qty = card.querySelector("input").value;
    let find = false;
    if (qty != 0) {
      if (keranjang.length != 0) {
        for (let i = 1; i <= keranjang.length; i++) {
          keranjang.forEach((e) => {
            if (e.title == card.querySelector(".title-product").innerText) {
              e.qty += parseInt(qty);
              find = true;
              i = keranjang.length;
              valueCart();
              console.log("Berhasil menambahkan produk", keranjang);
            }
          });
        }
        if (find == false) {
          tambahProduk(card);
          valueCart();
          console.log("Berhasil menambahkan produk", keranjang);
        }
      } else {
        tambahProduk(card);
        valueCart();
        console.log("Berhasil menambahkan produk", keranjang);
      }
    } else {
      Swal.fire({
        title: "Input Produk Kosong",
        text: "Mohon masukkan jumlah produk",
        icon: "error",
        confirmButtonText: "Oke",
      });
    }
    card.querySelector("input").value = 0;
  }
});

btnCart.addEventListener("click", () => {
  const modalBody = document.querySelector(".modal-body");
  let data = ``;
  keranjang.forEach((e) => {
    data += `<div class="row mb-4">
                <div class="col">
                  <div class="card border-0 shadow text-lg-start text-center">
                    <div class="card-body justify-content-center">
                      <div class="row align-items-center">
                        <div class="col-lg-3">
                          <img src="${e.image}" width="100%" class="shadow rounded img-product img-fluid" />
                        </div>
                        <div class="col-lg-6 mt-3 mt-lg-0">
                          <h2 class="fw-bolder title-product">${e.title}</h2>
                          <small class="fw-bolder text-primary">Harga</small>
                          <h2 class="fw-bolder price" data-price="${e.price}">Rp.${e.price}</h2>
                          <div class="input-qty d-flex justify-content-lg-start justify-content-center">
                            <input type="number" name="" min="1" class="me-2 border-primary rounded qty-value" value="${e.qty}" data-product="${e.title}" />
                            <button type="submit" class="btn btn-primary delete-product" data-product="${e.title}">Hapus</button>
                          </div>
                        </div>
                        <div class="col-lg-3 d-flex flex-column mt-3 mt-lg-0">
                          <h5 class="fs-6 fw-bolder text-primary">HARGA TOTAL</h5>
                          <h3 class="fw-bolder price-total">Rp.${e.qty * e.price}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
  });
  modalBody.innerHTML = data;

  modalBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("qty-value")) {
      let qty = e.target;
      let card = qty.parentElement.parentElement.parentElement;
      let totalPrice = card.querySelector(".price-total");
      let product = e.target.dataset.product;
      keranjang.forEach((el) => {
        if (product == el.title) {
          el.qty = parseInt(qty.value);
          totalPrice.innerText = `Rp.${el.price * el.qty}`;
          valueCart("first");
        }
      });
    } else if (e.target.classList.contains("delete-product")) {
      let btn = e.target;
      let card = btn.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
      let product = e.target.dataset.product;
      keranjang.forEach((el, i) => {
        if (product == el.title) {
          keranjang.splice(i, 1);
          valueCart("", "Data Berhasil Dihapus");
          card.remove();
        }
      });
    }
  });
});
